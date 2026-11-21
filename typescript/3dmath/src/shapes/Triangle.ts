import Vector3 from '../math/Vector3.js';

export default class Triangle {
  public a: Vector3;
  public b: Vector3;
  public c: Vector3;

  public color: string;

  constructor(
    a: Vector3 = new Vector3(),
    b: Vector3 = new Vector3(),
    c: Vector3 = new Vector3(),
    color: string = '#8800ff',
  ) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.color = color;
  }

  render(context: CanvasRenderingContext2D) {
    context.beginPath();

    context.fillStyle = this.color;

    context.moveTo(this.a.x, this.a.y);
    context.lineTo(this.b.x, this.b.y);
    context.lineTo(this.c.x, this.c.y);
    context.fill();
  }
}
