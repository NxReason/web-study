export class Node {
    size = 5;
    speed = 75;
    position = { x: 0, y: 0 };
    direction = { x: 1, y: 0 };
    createdAt = Date.now();
    lifespan;
    edges = [];
    constructor(position, lifespan = 5, direction) {
        this.position = position;
        this.direction = direction ?? this.genRandomDirection();
        this.lifespan = lifespan * 1000;
        this.speed = Math.floor(Math.random() * 75) + 25;
    }
    update(timeDelta) {
        const moveDelta = {
            x: this.direction.x * timeDelta * this.speed,
            y: this.direction.y * timeDelta * this.speed,
        };
        this.position = {
            x: this.position.x + moveDelta.x,
            y: this.position.y + moveDelta.y,
        };
    }
    shouldRemove() {
        return this.createdAt + this.lifespan < Date.now();
    }
    genRandomDirection() {
        let dir = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
        const len = Math.sqrt(dir.x ** 2 + dir.y ** 2);
        dir = { x: dir.x / len, y: dir.y / len };
        return dir;
    }
}
