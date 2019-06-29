import { requestAnimationFrame } from './util';
import { Puppet } from './puppet';

export class Timeline {
  isPlaying: boolean = false;
  puppets: Puppet<any, any>[] = [];
  seedTimestamp?: number;
  seekOffsetMs: number = 0;

  constructor() {
    requestAnimationFrame(this.onAnimationFrame);
  }

  onAnimationFrame = (timestamp: DOMHighResTimeStamp) => {
    if (this.isPlaying) {
      if (this.seedTimestamp === undefined) {
        this.seedTimestamp = timestamp;
      }
      const timeMs = (timestamp - this.seedTimestamp) + this.seekOffsetMs;
      // main update per frame
      this.puppets.forEach(puppet => puppet.tick(timeMs));
    }
    requestAnimationFrame(this.onAnimationFrame);
  };

  add(puppet: Puppet<any, any>) {
    puppet.timeline = this;
    this.puppets.push(puppet);
    return this;
  }

  start() {
    this.isPlaying = true;
    console.log('timeline start');
    this.seek(0);
    return this;
  }

  seek(timeMs: number) {
    delete this.seedTimestamp;
    this.seekOffsetMs = timeMs;
    this.puppets.forEach(puppet => puppet.seek(timeMs));
    return this;
  }

  pause() {
    this.isPlaying = false;
    return this;
  }

  resume() {
    this.isPlaying = true;
    return this;
  }
}
