import * as React from 'react';
import { Component } from 'react';
import { Blit } from './react-blit/blit';
import { BlitSurface } from './react-blit/surface';
import './less/editor.less';

export class Editor extends Component<{}, {}> {
    surface?: BlitSurface;

    onMouseMove = (x: number, y: number) => {
        console.log(x, y);
        if (this.surface) {
            this.surface
                .origin(x, y)
                .update();
        }
    };

    draw = (surface: BlitSurface) => {
        this.surface = surface
            .fill('green')
            .grid(0, 0, 100, 100, 'red', 10, 4)
            .line(0, 0, 4000, 300, 'blue')
            .line(4000, 0, 0, 300, 'blue');
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