import * as React from 'react';
import { Blit, BlitSurface, BlitDrawingContext } from 'react-blit/src';

const size = 32;
const lineWidth = 3;

export class Checkbox extends Blit {
    get width() { return size }
    get height() { return size }

    onMouseOver() {
        this.surface.visible('rollover').blit();
        console.log("over");
    }

    onMouseOut() {
        this.surface.visible('default').blit();
        console.log("out")
    }

    draw() {
        const { surface } = this;
        surface
            .buffer('default')
                .roundRect(0, 0, surface.width, surface.height, 5, 'red', '#ccc', lineWidth)
            .buffer('rollover')
                .filter('blur(5px)')
                .roundRect(0, 0, surface.width, surface.height, 5, 'blue', '#333', lineWidth)
            .visible('default')
            .blit();

    }
}