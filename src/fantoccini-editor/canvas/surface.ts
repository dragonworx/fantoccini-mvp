import { Layer } from './layer';
import { IReactCanvasGraphics } from './reactCanvas';

interface DrawInfo {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
}

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

    get drawInfo(): DrawInfo {
        const { activeLayer, graphics } = this;
        const { width, height } = graphics.info();
        const { ctx } = activeLayer;
        return {
            ctx,
            width,
            height,
        };
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

    origin(originX?: number, originY?: number) {
        this.originX = originX;
        this.originY = originY;
        return this;
    }
    
    fill(color: string) {
        const { ctx, width, height} = this.drawInfo;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        return this;
    }

    line(x1: number, y1: number, x2: number, y2: number, color: string = 'black') {
        const { ctx } = this.drawInfo;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        return this;
    }

    grid(x1: number, y1: number, x2: number, y2: number, color: string = 'black', hDivisions: number = 1, vDivisions: number = 1) {
        const { ctx, width, height} = this.drawInfo;
        const hInc = (x2 - x1) / hDivisions;
        const vInc = (y2 - y1) / vDivisions;
        for (let y = y1; y <= y2; y += vInc) {
            this.line(x1, y, x2, y, color);
            for (let x = x1; x <= x2; x += hInc) {
                this.line(x, y1, x, y2, color);
            }
        }
        return this;
    }
}
