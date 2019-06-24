import { Keyframe } from "./keyframe";
import { Motion } from "./motion";
import { EasingFn } from "./util";
import { ISeekable } from '.';

export class Sequence<ValueType> implements ISeekable {
  keyframes: Keyframe<ValueType>[] = [];
  activeKeyframe?: Keyframe<ValueType>;
  easeIn?: EasingFn;
  easeOut?: EasingFn;
  shouldAlternate: boolean = false;

  constructor(
      readonly motion: Motion<ValueType>,
      readonly startTimeMs: number,
      readonly lengthMs?: number,
  ) {}

  get isEmpty() {
    return this.keyframes.length === 0;
  }

  get keyframeDurationMs(): number {
      const { keyframes } = this;
      const l = keyframes.length;
      let ms = 0;
      for (let i = 0; i < l; i++) {
          ms += keyframes[i].durationMs;
      }
      return ms;
  }

  get durationMs(): number {
      const { lengthMs, keyframeDurationMs } = this;
      if (typeof lengthMs === 'number') {
        const divisions = lengthMs / keyframeDurationMs;
        return keyframeDurationMs * divisions;
      } else {
          return keyframeDurationMs;
      }
  }

  get endTimeMs(): number {
      return this.startTimeMs + this.durationMs;
  }

  repeatsAt(timeMs: number) {
    const startTimeMs = timeMs - this.startTimeMs;
    return Math.floor(startTimeMs / this.keyframeDurationMs);
  }

  isAlternateAt(timeMs: number) {
      return this.shouldAlternate ? this.repeatsAt(timeMs) % 2 != 0 : false;
  }

  frame(value: ValueType, durationMs: number, easingFn?: EasingFn) {
      const keyframe = new Keyframe(value, durationMs, easingFn);
      this.keyframes.push(keyframe);
      return this;
  }

  ease(easeIn: EasingFn, easeOut?: EasingFn) {
      this.easeIn = easeIn;
      this.easeOut = easeOut;
      return this;
  }

  alternate(value: boolean) {
      this.shouldAlternate = value;
      return this;
  }

  seek(timeMs: number) {
      delete this.activeKeyframe;
  }

  valueAt(localTimeMs: number, timeMs: number) {
    const { keyframes } = this;
    const l = keyframes.length;
    if (this.isAlternateAt(timeMs)) {
        localTimeMs = this.keyframeDurationMs - localTimeMs;
    }
    let startMs = 0;
    for (let i = 0; i < l; i++) {
        const keyframe = keyframes[i];
        const keyframeDurationMs = keyframe.durationMs;
        const endMs = startMs + keyframeDurationMs;
        let toValue: ValueType | number = keyframe.value;
        let fromValue: ValueType | number = this.motion.string.value;
        if (i >= 1) {
            fromValue = keyframes[i - 1].value;
        }
        if (localTimeMs >= startMs && localTimeMs <= endMs) {
            // active keyframe
            if (keyframe !== this.activeKeyframe) {
                // event!
                this.motion.string.puppet.onKeyframe(keyframe, i, this);
            }
            this.activeKeyframe = keyframe;
            if (typeof fromValue === 'number') {
                let easeFn = keyframe.easing;
                let t = (localTimeMs - startMs) / keyframeDurationMs;
                if (!!this.easeIn) {
                    if (i === 0) {
                        // first frame easeIn
                        easeFn = this.easeIn;
                    } else if (i === l - 1) {
                        // last frame easeOut
                        easeFn = this.easeOut;
                    }
                } else if (keyframe.easing) {
                    // keyframes easing
                    easeFn = keyframe.easing;
                }
                if (easeFn) {
                    t = easeFn(t);
                    const delta = (toValue as unknown as number) - fromValue;
                    return fromValue + (delta * t);
                }
            }
            // static value, happens immediately
            return toValue;
        }
        startMs += keyframe.durationMs;
        fromValue = keyframe.value;
    }
  }
}
