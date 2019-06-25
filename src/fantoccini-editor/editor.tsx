import * as React from 'react';
import { Component, createRef } from 'react';
import { ReactCanvas } from './canvas/reactCanvas';
import './less/editor.less';

export class Editor extends Component<{}, {}> {
    reactCanvasRef = createRef<ReactCanvas>();

    get surface() {
        return this.reactCanvasRef.current.surface;
    }

    onMouseMove = (x: number, y: number) => {
        const { surface } = this;
        if (surface) {
            console.log(x, y)
            surface.origin(x, y).update();
        }
    };

    componentDidMount() {
        const { surface } = this;
        if (surface) {
            surface
                .fill('green')
                .line(0, 0, 4000, 300, 'blue')
                .line(4000, 0, 0, 300, 'blue')
                .update();
        }
    }

    render() {
        return (
            <div className="editor">
                <ReactCanvas
                    ref={this.reactCanvasRef}
                    backgroundColor="rgba(0,0,255,0.3)"
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