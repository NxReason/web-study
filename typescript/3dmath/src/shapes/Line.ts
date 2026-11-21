import Vector3 from '../math/Vector3.js';

export default class Line {
  public from: Vector3;
  public to: Vector3;

  public color: string;

  constructor(
    from: Vector3 = new Vector3(),
    to: Vector3 = new Vector3(),
    color: string = '#8800ff',
  ) {
    this.from = from;
    this.to = to;

    this.color = color;
  }

  render(context: CanvasRenderingContext2D) {
    context.strokeStyle = this.color;

    context.beginPath();

    context.moveTo(this.from.x, this.from.y);
    context.lineTo(this.to.x, this.to.y);
    context.stroke();

    context.closePath();
  }
}
