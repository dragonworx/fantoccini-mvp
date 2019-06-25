import { IReactCanvasGraphics } from "./reactCanvas";

export class Layer {
    name: string;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor(name: string, readonly graphics: IReactCanvasGraphics) {
        this.name = name;
        const { width, height } = graphics.info();
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
    }
}