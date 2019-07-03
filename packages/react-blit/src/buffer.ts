export class Buffer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    visible: boolean = true;

    constructor(
        readonly name: string,
        readonly width: number,
        readonly height: number,
        x: number = 0,
        y: number = 0,
    ) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
    }
}