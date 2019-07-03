import * as React from 'react';
import { Component } from 'react';
import { Blit } from '../src/blit';
import { BlitSurface } from '../src/surface';
import { TestBlit } from '../example-util/testBlit';

export class BlitExample1 extends Component<{}, {}> {
    surface?: BlitSurface;

    onMouseMove = (x: number, y: number) => {
        console.log('Example1', x, y);
        if (this.surface) {
            this.surface
                .origin(x, y)
                .grid(1, 1, 100, 100, 10, 4, 'blue')
                .blit();
        }
    };

    draw = (surface: BlitSurface) => {
        this.surface = surface
            .fill('green')
            .grid(0, 0, 100, 100, 10, 4, 'red')
            .line(0, 0, 4000, 300, 'blue')
            .line(4000, 0, 0, 300, 'blue')
            .blit();
    };

    render() {
        return (
            <Blit
                width={400} 
                height={300} 
                innerWidth={4000}
                innerHeight={3000}
                draw={this.draw}
                onMouseMove={this.onMouseMove}
            >
            </Blit>
        )
    }
}

export class BlitExample2 extends Component<{}, {}> {
    surface?: BlitSurface;

    render() {
        return (
            <TestBlit
                width={400} 
                height={300}
            >
            </TestBlit>
        )
    }
}