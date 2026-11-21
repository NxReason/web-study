import Triangle from './shapes/Triangle.js';
import Vector3 from './math/Vector3.js';
import * as vm from './math/vecmath.js';
const canvas = document.getElementById('main-canvas');
const context = canvas.getContext('2d');
const triangle = new Triangle(new Vector3(100, 100), new Vector3(500, 500), new Vector3(900, 100));
triangle.render(context);
const xAxis = new Vector3(100, 0);
const yAxis = new Vector3(0, 100);
const v = new Vector3(60, 40);
console.log(vm.proj(v, xAxis));
console.log(vm.perp(v, xAxis));
console.log(vm.cross(yAxis, v));
// const padding = 50;
// const axisOrigin = new Vector3(padding, bounds.height - padding);
// const yAxis: Line = new Line(new Vector3(padding, padding), axisOrigin);
// yAxis.render(context);
// const xAxis: Line = new Line(
//   axisOrigin,
//   new Vector3(bounds.width - padding, bounds.height - padding),
// );
// xAxis.render(context);
// const line = new Line(axisOrigin, vm.scale(50, new Vector3(8, 5)), 'yellow');
// line.render(context);
