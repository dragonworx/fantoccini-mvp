import { PuppetString } from "../fantoccini-core";
import { getNumericStyleValue } from './util';

export class DomPixelStyleString extends PuppetString<HTMLElement, number> {
    get() {
        return getNumericStyleValue(this.objectRef, this.key);
    }

    set(value: number) {
        this.objectRef.style.setProperty(this.key, `${value}px`);
    }
}

export class DomNumericStyleString extends PuppetString<HTMLElement, number> {
    get() {
        return getNumericStyleValue(this.objectRef, this.key);
    }

    set(value: number) {
        this.objectRef.style.setProperty(this.key, `${value}`);
    }
}