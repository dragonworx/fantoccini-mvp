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
            .grid(1, 1, 100, 100, 10, 4, 'yellow')
            .blit();
    };

    onMouseOver(x: number, y: number) {
        console.log("mouseover", x, y);
    }

    onMouseOut(x: number, y: number) {
        console.log("mouseout", x, y);
    }

    draw() {
        this.surface
            .fill('blue')
            .grid(0, 0, 100, 100, 10, 4, 'red')
            .line(0, 0, 4000, 300, 'green')
            .line(4000, 0, 0, 300, 'green')
            .roundRect(50, 50, 100, 100, 10, 'rgba(0,0,0,0.3)', 'white', 5)
            .blit();
    }
}