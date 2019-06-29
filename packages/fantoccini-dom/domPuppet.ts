import { Puppet, IPuppet } from '../fantoccini-core';
import { DomPixelStyleString, DomNumericStyleString } from './strings';

export interface IDomPuppet {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
}

export class DomPuppet extends Puppet<HTMLElement, IDomPuppet> implements IPuppet, IDomPuppet {
  constructor(idOrElement: HTMLElement | string) {
    super(
      typeof idOrElement === 'string'
        ? (document.getElementById(idOrElement) as HTMLElement)
        : idOrElement
    );
  }

  attachStrings() {
    this.attach('left', DomPixelStyleString);
    this.attach('top', DomPixelStyleString);
    this.attach('width', DomPixelStyleString);
    this.attach('height', DomPixelStyleString);
    this.attach('opacity', DomNumericStyleString);
  }

  get left(): number {
    return this.get('left');
  }

  set left(value: number) {
    this.set('left', value);
  }
  
  get top(): number {
    return this.get('top');
  }

  set top(value: number) {
    this.set('top', value);
  }
  
  get width(): number {
    return this.get('width');
  }

  set width(value: number) {
    this.set('width', value);
  }
  
  get height(): number {
    return this.get('height');
  }

  set height(value: number) {
    this.set('height', value);
  }
  
  get opacity(): number {
    return this.get('opacity');
  }

  set opacity(value: number) {
    this.set('opacity', value);
  }
}
