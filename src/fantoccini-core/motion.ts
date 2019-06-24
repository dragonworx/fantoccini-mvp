import { Sequence } from "./sequence";
import { PuppetString } from "./string";
import { ISeekable } from '.';

export class Motion<ValueType> implements ISeekable {
  sequences: Sequence<ValueType>[] = [];

  constructor(readonly string: PuppetString<any, ValueType>) {
  }

  get isEmpty() {
    return this.sequences.length === 0;
  }

  get lastSequence(): Sequence<any> | undefined {
    const { sequences } = this;
    const l = sequences.length;
    if (l === 0) {
      return;
    }
    let maxEndTimeMs = 0;
    const map = new Map<number, Sequence<any>>();
    for (let i = 0; i < l; i++) {
      const sequence = sequences[i];
      const endTimeMs = sequence.endTimeMs;
      maxEndTimeMs = Math.max(maxEndTimeMs, endTimeMs);
      map.set(endTimeMs, sequence);
    }
    return map.get(maxEndTimeMs);
  }

  seek(timeMs: number) {
    const { sequences } = this;
    const l = sequences.length;
    for (let i = 0; i < l; i++) {
      sequences[i].seek(timeMs);
    }
  }

  isRestingAt(timeMs: number) {
    const { sequences } = this;
    const l = sequences.length;
    if (l === 0) {
      return false;
    }
    for (let i = 0; i < l; i++) {
      if (sequences[i].endTimeMs <= timeMs) {
        return true;
      }
    }
    return false;
  }

  hasNotPlayedAt(timeMs: number) {
    const { sequences } = this;
    const l = sequences.length;
    if (l === 0) {
      return true;
    }
    for (let i = 0; i < l; i++) {
      if (sequences[i].startTimeMs <= timeMs) {
        return false;
      }
    }
    return true;
  }

  sequence(startMs: number = 0, lengthMs?: number) {
    const sequence = new Sequence<ValueType>(this, startMs, lengthMs);
    this.sequences.push(sequence);
    return sequence;
  }

  sequencesAt(timeMs: number): Sequence<ValueType>[] {
    return this.sequences.filter(sequence => timeMs >= sequence.startTimeMs && timeMs <= sequence.endTimeMs);
  }
}
