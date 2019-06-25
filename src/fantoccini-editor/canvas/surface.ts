import { Layer } from './layer';
import { IReactCanvasGraphics } from './reactCanvas';

export class ReactCanvasSurface implements IReactCanvasGraphics {
    originX: number = 0;
    originY: number = 0;
    scaleX: number = 1;
    scaleY: number = 1;
    layers: Layer[] = [];
    activeLayer: Layer;
    
    constructor (readonly graphics: IReactCanvasGraphics) {
        const layer = new Layer('background', this);
        this.layers.push(layer);
        this.activeLayer = layer;
    }

    info() {
        return this.graphics.info();
    }

    update() {
        this.graphics.update();
        return this;
    }

    layer(name: string) {
        const layer = this.layers.find(layer => layer.name === name);
        if (layer) {
            this.activeLayer = layer;
        } else {
            throw new Error(`Layer "${name} not found`);
        }
        return this;
    }

    origin(originX: number, originY: number) {
        this.originX = originX;
        this.originY = originY;
        return this;
    }

    
    fill(color: string) {
        const { activeLayer, graphics } = this;
        const { width, height } = graphics.info();
        const { ctx } = activeLayer;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        return this;
    }

    line(x1: number, y1: number, x2: number, y2: number, color: string = 'black') {
        const { activeLayer } = this;
        const { ctx } = activeLayer;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        return this;
    }
}
