import { Buffer } from "./buffer";

export class BlitSurface {
  originX: number = 0;
  originY: number = 0;
  private buffers: Buffer[] = [];
  private activeBuffer: Buffer;

  constructor(
    readonly width: number,
    readonly height: number,
    private readonly updateCallback: () => void
  ) {
    const buffer = new Buffer("default", width, height);
    this.buffers.push(buffer);
    this.activeBuffer = buffer;
  }

  get ctx() {
      return this.activeBuffer.ctx;
  }

  buffer(
    name: string,
    width: number = this.width,
    height: number = this.height,
    x: number = 0,
    y: number = 0
  ) {
    let buffer = this.buffers.find(buffer => buffer.name === name);
    if (!buffer) {
        buffer = new Buffer(name, width, height, x, y);
        this.buffers.push(buffer);
    }
    this.activeBuffer = buffer;
    return this;
  }

  eachBuffer(fn: (buffer: Buffer) => void) {
    this.buffers.forEach(buffer => fn(buffer));
    return this;
  }

  visible(...args: string[]) {
      const bufferNames = [...args];
      return this.eachBuffer(buffer => buffer.visible = bufferNames.indexOf(buffer.name) >= 0);
  }

  bufferPos(x: number, y: number) {
    const { activeBuffer } = this;
    activeBuffer.x = x;
    activeBuffer.y = y;
    return this;
  }

  blit() {
    this.updateCallback();
    return this;
  }

  origin(x: number, y: number) {
    this.originX = x;
    this.originY = y;
    return this;
  }

  fill(fillStyle: string) {
    const {
      ctx,
      width,
      height
    } = this;
    this.rect(0, 0, width, height, fillStyle);
    return this;
  }

  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    fillStyle?: string,
    strokeStyle?: string
  ) {
    const { ctx } = this;
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    if (fillStyle) {
      ctx.fillRect(x, y, width, height);
    }
    if (strokeStyle) {
      ctx.strokeRect(x, y, width, height);
    }
    return this;
  }

  line(x1: number, y1: number, x2: number, y2: number, strokeStyle: string) {
    const { ctx } = this;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    return this;
  }

  grid(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    hDivisions: number = 1,
    vDivisions: number = 1,
    strokeStyle: string
  ) {
    const { ctx } = this;
    const hInc = (x2 - x1) / hDivisions;
    const vInc = (y2 - y1) / vDivisions;
    ctx.strokeStyle = strokeStyle;
    for (let y = y1; y <= y2; y += vInc) {
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.closePath();
      ctx.stroke();
      for (let x = x1; x <= x2; x += hInc) {
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.closePath();
        ctx.stroke();
      }
    }
    return this;
  }

  private drawRoundRectPath(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number[]
  ) {
    const { ctx } = this;
    const [tl, tr, br, bl] = radius;
    ctx.beginPath();
    ctx.moveTo(x + tl, y);
    ctx.lineTo(x + width - tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + tr);
    ctx.lineTo(x + width, y + height - br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - br, y + height);
    ctx.lineTo(x + bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - bl);
    ctx.lineTo(x, y + tl);
    ctx.quadraticCurveTo(x, y, x + tl, y);
    ctx.closePath();
  }

  roundRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number | number[] = 5,
    fillStyle?: string,
    strokeStyle?: string,
    lineWidth?: number,
  ) {
    const { ctx } = this;
    if (typeof radius === "number") {
      radius = [radius, radius, radius, radius];
    }
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    this.drawRoundRectPath(x, y, width, height, radius);
    if (fillStyle) {
        ctx.fill();
    }
    if (strokeStyle) {
        ctx.stroke();
    }
    return this;
  }

  filter(filter: string) {
      this.activeBuffer.ctx.filter = filter;
      return this;
  }

  clear() {
    const { activeBuffer } = this;
    activeBuffer.ctx.clearRect(0, 0, activeBuffer.width, activeBuffer.height);
    return this;
  }
}
