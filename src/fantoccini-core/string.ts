import { Movement } from "./movement";
import { Puppet } from "./puppet";
import { IPuppetString, ISeekable } from '.';

export class PuppetString<PuppetType, ValueType> implements IPuppetString, ISeekable {
  motion: Movement<ValueType>;
  value: ValueType;

  constructor(
    readonly puppet: Puppet<any, any>,
    readonly key: string,
    readonly objectRef: PuppetType,
  ) {
    this.motion = new Movement(this);
    this.value = this.get();
  }

  get (): ValueType {
    return (this.objectRef as any)[this.key] as ValueType;
  }

  set (value: ValueType) {
    (this.objectRef as any)[this.key] = value;
  }

  seek(timeMs: number) {
    this.motion.seek(timeMs);
  }
}
