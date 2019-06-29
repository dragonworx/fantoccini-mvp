import { Blit } from '../src';

export class TestBlit extends Blit {
    get innerWidth() {
        return 4000;
    }

    get innerHeight() {
        return 3000;
    }

    onMouseMove(x: number, y: number) {
        console.log("TestBlit", x, y);
        this.surface
            .origin(x, y)
            .grid(1, 1, 100, 100, 'yellow', 10, 4)
            .refresh();
    };

    draw() {
        this.surface
            .fill('blue')
            .grid(0, 0, 100, 100, 'red', 10, 4)
            .line(0, 0, 4000, 300, 'green')
            .line(4000, 0, 0, 300, 'green')
            .refresh();
    }
}