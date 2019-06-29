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
                .grid(1, 1, 100, 100, 'blue', 10, 4)
                .refresh();
        }
    };

    draw = (surface: BlitSurface) => {
        this.surface = surface
            .fill('green')
            .grid(0, 0, 100, 100, 'red', 10, 4)
            .line(0, 0, 4000, 300, 'blue')
            .line(4000, 0, 0, 300, 'blue')
            .refresh();
    };

    render() {
        return (
            <div className="editor">
                <Blit
                    width={400} 
                    height={300} 
                    innerWidth={4000}
                    innerHeight={3000}
                    draw={this.draw}
                    onMouseMove={this.onMouseMove}
                >
                </Blit>
            </div>
        )
    }
}

export class BlitExample2 extends Component<{}, {}> {
    surface?: BlitSurface;

    render() {
        return (
            <div className="editor">
                <TestBlit
                    width={400} 
                    height={300}
                >
                </TestBlit>
            </div>
        )
    }
}