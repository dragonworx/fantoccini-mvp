import * as React from 'react';
import { Component, createRef } from 'react';
import { BlitSurface } from './surface';

const isNum = (value: any) => typeof value === 'number';
type MouseHandler = (x: number, y: number) => void;

export interface Props {
    width: number,
    height: number,
    innerWidth?: number,
    innerHeight?: number,
    onMouseOver?: MouseHandler;
    onMouseMove?: MouseHandler;
    onMouseOut?: MouseHandler;
    draw: (surface: BlitSurface) => void;
}

export interface State {
    
}

export class Blit extends Component<Props, State> {
    surface?: BlitSurface;
    onscreenRef = createRef<HTMLCanvasElement>();
    offscreen = document.createElement('canvas');

    state = {
    };

    get onscreen() {
        return this.onscreenRef.current;
    }

    get onscreenContext() {
        return this.onscreen.getContext('2d');
    }

    get offscreenContext()  {
        return this.offscreen.getContext('2d');
    }

    get sizes() {
        const { width, height, innerWidth: iw, innerHeight: ih } = this.props;
        const innerWidth = isNum(iw) ? iw : width;
        const innerHeight = isNum(ih) ? ih : height;
        return {
            width,
            height,
            innerWidth,
            innerHeight,
        };
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

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.setCanvasSizesFromProps();
        this.initSurface();
        this.draw();
        this.update();
    }

    setCanvasSizesFromProps() {
        const { onscreen, offscreen, width, height, innerWidth, innerHeight } = this;
        onscreen.style.width = `${width}px`;
        onscreen.style.height = `${height}px`;
        onscreen.width = width;
        onscreen.height = height;
        offscreen.width = innerWidth;
        offscreen.height = innerHeight;
    }

    initSurface() {
        this.surface = new BlitSurface(this.offscreen, this.innerWidth, this.innerHeight, this.update);
    }

    draw() {
        const { surface } = this;
        surface && this.props.draw(surface);
    }

    update = () => {
        const { surface, offscreenContext } = this;
        if (surface) {
            surface.buffers.forEach(buffer => {
                if (buffer.ctx !== this.offscreenContext) {
                    offscreenContext.drawImage(buffer.canvas, buffer.x, buffer.y);
                }
            });
        }
        this.forceUpdate();
    };

    handleMouse = (callback?: MouseHandler) => {
        return (e: any) => {
            const x = e.clientX;
            const y = e.clientY;
            const { offsetLeft, offsetTop } = e.target as HTMLCanvasElement;
            callback && callback(x - offsetLeft, y - offsetTop);
        };
    };

    render() {
        if (this.onscreen) {
            const { onscreenContext, offscreen, surface } = this;
            const { originX, originY } = surface;
            if (onscreenContext) {
                onscreenContext.resetTransform();
                onscreenContext.translate(-originX, -originY);
                onscreenContext.drawImage(offscreen, 0, 0);
            }
        }
        const { props } = this;
        return (
            <canvas 
                className="react-blit" 
                ref={this.onscreenRef}
                onMouseOver={this.handleMouse(props.onMouseOver)}
                onMouseMove={this.handleMouse(props.onMouseMove)}
                onMouseOut={this.handleMouse(props.onMouseOut)}
            >
            </canvas>
        )
    }
}