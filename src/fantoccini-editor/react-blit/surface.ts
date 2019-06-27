import { Buffer } from './buffer';

export class BlitSurface {
    originX: number = 0;
    originY: number = 0;
    buffers: Buffer[] = [];
    activeBuffer: Buffer;
    
    constructor (
        readonly canvas: HTMLCanvasElement, 
        readonly width: number, 
        readonly height: number,
        readonly onUpdate: () => void,
    ) {
        const buffer = new Buffer('background', canvas, width, height);
        this.buffers.push(buffer);
        this.activeBuffer = buffer;
    }

    newBuffer(name: string, width: number = this.width, height: number = this.height, x: number = 0, y: number = 0) {
        const buffer = new Buffer(name, null, width, height, x, y);
        this.buffers.push(buffer);
        this.activeBuffer = buffer;
        return this;
    }

    setBuffer(name: string) {
        const buffer = this.buffers.find(buffer => buffer.name === name);
        if (buffer) {
            this.activeBuffer = buffer;
        } else {
            throw new Error(`Blit surface buffer "${name} not found`);
        }
        return this;
    }

    bufferPos(x: number, y: number) {
        const buffer = this.buffers.find(buffer => buffer.name === name);
        if (buffer) {
            buffer.x = x;
            buffer.y = y;
        } else {
            throw new Error(`Blit surface buffer "${name} not found`);
        }
        return this;
    }

    update() {
        this.onUpdate();
    }

    origin(x: number, y: number) {
        this.originX = x;
        this.originY = y;
        return this;
    }
    
    fill(color: string) {
        const { activeBuffer: {ctx}, width, height} = this;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        return this;
    }

    line(x1: number, y1: number, x2: number, y2: number, color: string = 'black') {
        const { activeBuffer: {ctx} } = this;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();
        return this;
    }

    grid(x1: number, y1: number, x2: number, y2: number, color: string = 'black', hDivisions: number = 1, vDivisions: number = 1) {
        const { activeBuffer: {ctx} } = this;
        const hInc = (x2 - x1) / hDivisions;
        const vInc = (y2 - y1) / vDivisions;
        ctx.strokeStyle = color;
        for (let y = y1; y <= y2; y += vInc) {
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();
            ctx.closePath();
            for (let x = x1; x <= x2; x += hInc) {
                ctx.beginPath();
                ctx.moveTo(x, y1);
                ctx.lineTo(x, y2);
                ctx.stroke();
                ctx.closePath();
            }
        }
        return this;
    }
}
