import Vector3 from '../math/Vector3.js';
export default class Triangle {
    a;
    b;
    c;
    color;
    constructor(a = new Vector3(), b = new Vector3(), c = new Vector3(), color = '#8800ff') {
        this.a = a;
        this.b = b;
        this.c = c;
        this.color = color;
    }
    render(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.moveTo(this.a.x, this.a.y);
        context.lineTo(this.b.x, this.b.y);
        context.lineTo(this.c.x, this.c.y);
        context.fill();
    }
}
