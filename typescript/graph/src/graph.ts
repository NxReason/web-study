interface GraphStyle {
  nodeColor: string;
  nodeSize: number;

  connColor: string;
  connWidth: number;
}

const DEFAULT_STYLE: GraphStyle = {
  nodeColor: '#fefefe',
  nodeSize: 20,

  connColor: '#800083',
  connWidth: 3,
};

export default class Graph<T> {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  name: string;
  nodes: Record<string, GraphNode<T>>;
  style: GraphStyle;

  constructor(canvas: HTMLCanvasElement, name: string = 'Graph') {
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;
    this.name = name;
    this.nodes = {};
    this.style = DEFAULT_STYLE;
  }

  addNodes(data: T[]): string[] {
    const ids: string[] = new Array(data.length);

    data.forEach((val, index) => {
      const node = new GraphNode(val, { x: 0, y: 0 });
      this.nodes[node.id] = node;
      ids[index] = node.id;
    });

    return ids;
  }

  setPosition(id: string, pos: Position) {
    this.nodes[id].pos = pos;
  }

  addConnection(fromId: string, toId: string) {
    if (this.nodes[fromId] === undefined) {
      console.error(
        `Trying to add connection from non-existent node ${fromId}`,
      );
      return;
    }
    if (this.nodes[toId] === undefined) {
      console.error(`Trying to add connection to non-existent node ${toId}`);
      return;
    }

    if (this.nodes[fromId].edges.includes(toId)) return;
    this.nodes[fromId].edges.push(toId);
  }

  draw() {
    this.context.strokeStyle = this.style.connColor;
    this.context.lineWidth = this.style.connWidth;
    for (const node of Object.values(this.nodes)) {
      for (const toId of node.edges) {
        this.drawEdge(node.id, toId);
      }
    }

    this.context.fillStyle = this.style.nodeColor;
    for (const node of Object.values(this.nodes)) {
      this.drawNode(node);
    }
  }

  private drawNode(node: GraphNode<T>) {
    const size = this.style.nodeSize;
    const off = size / 2;
    const { x, y } = node.pos;
    this.context.fillRect(x - off, y - off, size, size);
  }

  private drawEdge(fromId: string, toId: string) {
    const start = this.nodes[fromId].pos;
    const end = this.nodes[toId].pos;

    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.stroke();
    this.context.closePath();
  }
}

type Position = { x: number; y: number };

export class GraphNode<T> {
  id: string;
  value: T;
  edges: string[];
  pos: Position;

  constructor(value: T, pos: Position) {
    this.id = crypto.randomUUID();
    this.value = value;
    this.edges = [];
    this.pos = pos;
  }
}
