import * as React from 'react';
import { Component, createRef } from 'react';
import { ReactCanvas } from './canvas/reactCanvas';
import { ReactCanvasSurface } from './canvas/surface';
import './less/editor.less';

export class Editor extends Component<{}, {}> {
    surface?: ReactCanvasSurface;

    onMouseMove = (x: number, y: number, surface: ReactCanvasSurface) => {
        console.log(x, y)
        surface
            .origin(x, y)
            .update();
    };

    render() {
        return (
            <div className="editor">
                <ReactCanvas
                    draw={surface => {
                        this.surface = surface;
                        surface
                        .fill('green')
                        .grid(0, 0, 400, 300, 'red', 10, 4)
                        .line(0, 0, 4000, 300, 'blue')
                        .line(4000, 0, 0, 300, 'blue')
                        .update();
                    }}
                    width={400} 
                    height={300} 
                    innerWidth={4000}
                    innerHeight={3000}
                    onMouseMove={this.onMouseMove}
                >
                </ReactCanvas>
            </div>
        )
    }
}