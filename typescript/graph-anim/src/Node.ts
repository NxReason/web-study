import type { CanvasAnimator } from './app.js';
export type Vector2 = { x: number; y: number };

export class Node {
  size: number = 5;
  speed: number = 75;

  position: Vector2 = { x: 0, y: 0 };
  direction: Vector2 = { x: 1, y: 0 };

  createdAt: number = Date.now();
  lifespan: number;

  edges: string[] = [];

  constructor(position: Vector2, lifespan: number = 5, direction?: Vector2) {
    this.position = position;
    this.direction = direction ?? this.genRandomDirection();
    this.lifespan = lifespan * 1000;

    this.speed = Math.floor(Math.random() * 75) + 25;
  }

  public update(timeDelta: number) {
    const moveDelta: Vector2 = {
      x: this.direction.x * timeDelta * this.speed,
      y: this.direction.y * timeDelta * this.speed,
    };

    this.position = {
      x: this.position.x + moveDelta.x,
      y: this.position.y + moveDelta.y,
    };
  }

  public shouldRemove(): boolean {
    return this.createdAt + this.lifespan < Date.now();
  }

  private genRandomDirection(): Vector2 {
    let dir = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
    const len = Math.sqrt(dir.x ** 2 + dir.y ** 2);
    dir = { x: dir.x / len, y: dir.y / len };
    return dir;
  }
}
