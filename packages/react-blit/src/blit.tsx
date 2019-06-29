import * as React from 'react';
import { Component, createRef } from 'react';
import { BlitSurface } from './surface';

const isNum = (value: any) => typeof value === 'number';
type MouseHandler = (x: number, y: number) => void;

export interface BlitProps {
    width: number,
    height: number,
    innerWidth?: number,
    innerHeight?: number,
    onMouseOver?: MouseHandler;
    onMouseMove?: MouseHandler;
    onMouseOut?: MouseHandler;
    draw?: (surface: BlitSurface) => void;
}

export class Blit extends Component<BlitProps, {}> {
    surface?: BlitSurface;
    onscreenCanvasRef = createRef<HTMLCanvasElement>();
    offscreenCanvas: HTMLCanvasElement;

    constructor(props: BlitProps) {
        super(props);
        const { innerWidth, innerHeight } = this;
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = innerWidth;
        offscreenCanvas.height = innerHeight;
        this.offscreenCanvas = offscreenCanvas;
        this.surface = new BlitSurface(offscreenCanvas, innerWidth, innerHeight, this.update);
    }

    get onscreenCanvas() {
        return this.onscreenCanvasRef.current;
    }

    get onscreenContext() {
        return this.onscreenCanvas.getContext('2d');
    }

    get offscreenContext()  {
        return this.offscreenCanvas.getContext('2d');
    }

    get width() {
        return this.props.width;
    }

    get height() {
        return this.props.height;
    }

    get innerWidth() {
        const { width, innerWidth: iw } = this.props;
        return isNum(iw) ? iw : width;
    }

    get innerHeight() {
        const { height, innerHeight: ih } = this.props;
        return isNum(ih) ? ih : height;
    }

    handleMouse = (selfCallback: MouseHandler, callback?: MouseHandler) => {
        return (e: any) => {
            const { offsetLeft, offsetTop } = e.target as HTMLCanvasElement;
            const x = e.clientX - offsetLeft;
            const y = e.clientY - offsetTop;
            callback && callback(x, y);
            selfCallback.call(this, x ,y);
        };
    };

    onMouseOver(x: number, y: number) {
    };

    onMouseMove(x: number, y: number) {
    };

    onMouseOut(x: number, y: number) {   
    };

    componentDidMount() {
        const { draw } = this.props;
        this.draw();
        draw && draw(this.surface);
        this.update();
    }

    draw() {
        // subclasses can override...
    }

    update = () => {
        const { surface, offscreenCanvas, onscreenContext, offscreenContext, width, height } = this;
        if (surface) {
            onscreenContext.resetTransform();
            onscreenContext.clearRect(0, 0, width, height);
            surface.buffers.forEach(buffer => {
                if (buffer.ctx !== this.offscreenContext) {
                    offscreenContext.drawImage(buffer.canvas, buffer.x, buffer.y);
                }
            });
            const { originX, originY } = surface;
            onscreenContext.translate(-originX, -originY);
            onscreenContext.drawImage(offscreenCanvas, 0, 0);
        }
    };

    render() {
        const { props, width, height } = this;
        const style = {
            width: `${width}px`,
            height: `${height}px`,
        };
        return (
            <canvas 
                ref={this.onscreenCanvasRef}
                className="react-blit" 
                width={width}
                height={height}
                style={style}
                onMouseOver={this.handleMouse(this.onMouseOver, props.onMouseOver)}
                onMouseMove={this.handleMouse(this.onMouseMove, props.onMouseMove)}
                onMouseOut={this.handleMouse(this.onMouseOut, props.onMouseOut)}
            >
            </canvas>
        )
    }
}