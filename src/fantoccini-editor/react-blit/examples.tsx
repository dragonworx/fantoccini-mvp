import * as React from 'react';
import { Component } from 'react';
import { Blit } from './blit';
import { BlitSurface } from './surface';

export class TestBlit extends Blit {
    get innerWidth() {
        return 4000;
    }

    get innerHeight() {
        return 3000;
    }

    onMouseMove(x: number, y: number) {
        console.log("TestBlit", x, y);
        this.surface
            .origin(x, y)
            .grid(1, 1, 100, 100, 'yellow', 10, 4)
            .refresh();
    };

    draw() {
        this.surface
            .fill('blue')
            .grid(0, 0, 100, 100, 'red', 10, 4)
            .line(0, 0, 4000, 300, 'green')
            .line(4000, 0, 0, 300, 'green')
            .refresh();
    }
}

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