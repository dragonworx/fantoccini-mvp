import { PuppetString } from "./string";
import { Timeline } from "./timeline";
import { Motion } from "./motion";
import { Sequence } from "./sequence";
import { Keyframe } from "./keyframe";
import { ISeekable, IPuppet } from '.';

export type Class = { new (...args: any[]): any };

export abstract class Puppet<PuppetType, PuppetInterface> implements IPuppet, ISeekable {
  timeline?: Timeline;
  strings: Map<
    keyof PuppetInterface,
    PuppetString<PuppetType, any>
  > = new Map();
  activeSequences: Sequence<any>[] = [];

  constructor(readonly objectRef: PuppetType) {
    // call subclass override to init
    this.attachStrings();
  }

  attachStrings() {
    throw new Error('Puppet subclasses should implement `attachStrings():void` to bind strings to object reference.')
  }

  protected get(key: keyof PuppetInterface): any {
    return this.strings.get(key).get();
  }

  protected set(key: keyof PuppetInterface, value: any) {
    this.strings.get(key).set(value);
  }

  protected attach(key: keyof PuppetInterface, StringConstructor: Class) {
    this.strings.set(key, new StringConstructor(this, key as string, this.objectRef));
  }

  keys(): string[] {
    const keys = [];
    for (let [key] of this.strings) {
      keys.push(key as string);
    }
    return keys;
  }

  values(): PuppetInterface {
    const values: PuppetInterface = {} as PuppetInterface;
    for (let [key, string] of this.strings) {
      values[key] = string.get();
    }
    return values;
  }

  motion(key: keyof PuppetInterface): Motion<any> {
    return this.strings.get(key).motion;
  }

  seek(timeMs: number) {
    for (let [, string] of this.strings) {
      string.seek(timeMs);
    }
  }

  emitActiveSequenceEvents(activeSequences: Sequence<any>[]) {
    const source = this.activeSequences;
    const target = activeSequences;
    source.forEach(sequence => {
      if (target.indexOf(sequence) === -1) {
        this.onSequenceEnd(sequence);
      }
    });
    target.forEach(sequence => {
      if (source.indexOf(sequence) === -1) {
        this.onSequenceStart(sequence);
      }
    });
  }

  tick(timeMs: number) {
    for (let [key, string] of this.strings) {
      if (string.motion.isEmpty) {
        continue;
      }
      // get active sequences at current time
      const motion = string.motion;
      const activeSequences = motion.sequencesAt(timeMs);
      const l = activeSequences.length;
      if (l !== this.activeSequences.length) {
        this.emitActiveSequenceEvents(activeSequences);
      }
      if (l === 0) {
        // if the channel has already played sequences
        if (motion.isRestingAt(timeMs)) {
          // try get last sequence for channel
          const sequence = motion.lastSequence;
          if (sequence) {
            const localTime = sequence.durationMs % sequence.keyframeDurationMs;
            const value = sequence.valueAt(localTime, sequence.endTimeMs);
            string.set(value);
          }
        } else if (motion.hasNotPlayedAt(timeMs)) {
          string.set(string.value);
        }
      } else {
        // for each sequence, get value at time and set string value
        for (let i = 0; i < l; i++) {
          const sequence = activeSequences[i];
          const startTimeMs = timeMs - sequence.startTimeMs;
          const localTimeMs = startTimeMs % sequence.keyframeDurationMs;
          const value = sequence.valueAt(localTimeMs, timeMs);
          string.set(value);
        }
      }
      this.activeSequences = activeSequences;
    }
  }

  onKeyframe(keyframe: Keyframe<any>, i: number, sequence: Sequence<any>) {
    console.log('keyframe', i);
  }

  onSequenceStart(sequence: Sequence<any>) {
    console.log('sequence started');
  }

  onSequenceEnd(sequence: Sequence<any>) {
    console.log('sequence ended');
  }
}
