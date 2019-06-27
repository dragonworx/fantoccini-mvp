export class Buffer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;

    constructor(
        readonly name: string,
        canvas: HTMLCanvasElement | null,
        readonly width: number,
        readonly height: number,
        x: number = 0,
        y: number = 0,
    ) {
        if (canvas === null) {
            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
        }
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
}