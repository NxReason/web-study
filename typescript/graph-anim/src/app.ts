const canvas = document.getElementById('canvas') as HTMLCanvasElement;

type Position = { x: number; y: number };
type Rect = { width: number; height: number };

class CanvasAnimator {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private lastTime: number = 0;
  private frameId: number | null = null;
  private rect: Rect;

  // draw data
  radius: number = 50;
  size: number = 20;
  center: Position = { x: 0, y: 0 };
  current: Position = { x: this.radius, y: 0 };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;

    const rect = canvas.getBoundingClientRect();
    this.rect = {
      width: rect.width,
      height: rect.height,
    };

    this.center = {
      x: this.rect.width / 2,
      y: this.rect.height / 2,
    };
    this.current = {
      x: this.center.x + this.radius,
      y: this.center.y,
    };
  }

  public start() {
    if (this.frameId !== null) return;

    this.lastTime = performance.now();
    this.frameId = requestAnimationFrame(this.loop);
  }

  public stop() {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  private loop = (currentTime: number) => {
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    this.update(dt);
    this.draw();

    this.frameId = requestAnimationFrame(this.loop);
  };

  private totalTime: number = 0;
  public speed: number = 2;
  private update(delta: number) {
    this.totalTime += delta * this.speed;
    this.current.x = this.center.x + Math.cos(this.totalTime) * this.radius;
    this.current.y = this.center.y + Math.sin(this.totalTime) * this.radius;
  }

  private draw() {
    this.context.clearRect(0, 0, this.rect.width, this.rect.height);
    this.context.fillStyle = '#fefefe';

    this.context.fillRect(
      this.current.x - this.size / 2,
      this.current.y - this.size / 2,
      20,
      20,
    );
  }
}

const g = new CanvasAnimator(canvas);
g.start();
