import Graph from './graph.js';
import Entity, { genEntities } from './Entity.js';

// data
const COUNT = 30;
const entities = genEntities(COUNT);

// canvas
const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
const g = new Graph(canvas, 'const graph');
const ids = g.addNodes(entities);

const width = canvas.width;
const height = canvas.height;
const padding = 50;

const genRandomPos = () => {
  return {
    x: Math.random() * (width - padding * 2) + padding,
    y: Math.random() * (height - padding * 2) + padding,
  };
};

function pickN<T>(values: T[], count: number): T[] {
  if (count > values.length) {
    throw new RangeError('pickN - count must be <= values.length');
  }

  const copy = [...values];
  for (let i = 0; i < count; i++) {
    const swapIndex = Math.floor(Math.random() * (values.length - i)) + i;
    const temp = copy[i];
    copy[i] = values[swapIndex];
    copy[swapIndex] = temp;
  }
  return copy.slice(0, count);
}

ids.forEach(id => {
  // set random positions
  g.setPosition(id, genRandomPos());

  // add N random connections
  const maxConn = 2;
  const connCount = Math.floor(Math.random() * (maxConn + 1));
  const edges = pickN(ids, connCount);
  for (const edge of edges) {
    g.addConnection(id, edge);
  }
});
g.draw();
