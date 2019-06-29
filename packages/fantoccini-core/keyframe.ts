import { EasingFn } from "./util";

export class Keyframe<ValueType> {
  constructor(
    readonly value: ValueType,
    readonly durationMs: number,
    readonly easing?: EasingFn
  ) {
  }
}