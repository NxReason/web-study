import Vector3 from '../math/Vector3.js';
export default class Line {
    from;
    to;
    color;
    constructor(from = new Vector3(), to = new Vector3(), color = '#8800ff') {
        this.from = from;
        this.to = to;
        this.color = color;
    }
    render(context) {
        context.strokeStyle = this.color;
        context.beginPath();
        context.moveTo(this.from.x, this.from.y);
        context.lineTo(this.to.x, this.to.y);
        context.stroke();
        context.closePath();
    }
}
