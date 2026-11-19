import { Node, type Vector2 } from './Node.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

type Rect = { width: number; height: number };

export class CanvasAnimator {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private lastTime: number = 0;
  private frameId: number | null = null;
  private rect: Rect;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;

    const rect = canvas.getBoundingClientRect();
    this.rect = {
      width: rect.width,
      height: rect.height,
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

  private update(delta: number) {
    for (const [id, node] of this.nodes.entries()) {
      if (node.shouldRemove()) {
        this.resetNode(id);
        continue;
      }

      node.update(delta);

      if (this.isOutBounds(node.position)) {
        this.resetNode(id);
      }
    }
  }

  private draw() {
    this.context.clearRect(0, 0, this.rect.width, this.rect.height);

    this.context.strokeStyle = '#4444';
    this.context.lineWidth = 1;
    for (const node of this.nodes.values()) {
      for (const edge of node.edges) {
        const toNode = this.nodes.get(edge);
        if (!toNode) {
          console.log(`WARN: edge (${edge}) not found`);
          continue;
        }

        this.context.beginPath();
        this.context.moveTo(node.position.x, node.position.y);
        this.context.lineTo(toNode.position.x, toNode.position.y);
        this.context.stroke();
        this.context.closePath();
      }
    }

    this.context.fillStyle = '#fefefeaa';
    for (const node of this.nodes.values()) {
      this.context.fillRect(
        node.position.x - node.size / 2,
        node.position.y - node.size / 2,
        node.size,
        node.size,
      );
    }
  }

  // data
  private nodes: Map<string, Node> = new Map();
  public addNodes(nodes: Node[]) {
    for (const node of nodes) {
      this.nodes.set(crypto.randomUUID(), node);
    }
  }

  public generateNodes(count: number = 30) {
    for (let i = 0; i < count; i++) {
      this.generateNode();
    }
    for (const [id, node] of this.nodes.entries()) {
      node.edges = this.pickRandomEdges(id);
    }
  }

  private generateNode(): [string, Node] {
    const id = crypto.randomUUID();
    const lifespan = Math.random() * 9 + 1;
    const node = new Node(this.genRandomPosition(), lifespan);
    this.nodes.set(id, node);
    return [id, node];
  }

  private genRandomPosition(): Vector2 {
    return {
      x: Math.floor(Math.random() * this.rect.width),
      y: Math.floor(Math.random() * this.rect.height),
    };
  }

  private pickRandomEdges(fromId: string): string[] {
    let count = Math.floor(Math.random() * 2) + 1;
    const ids = Array.from(this.nodes.keys()).filter(id => id !== fromId);
    if (ids.length < count) count = ids.length;

    for (let i = 0; i < count; i++) {
      const picked = Math.floor(Math.random() * (ids.length - i)) + i;
      const temp = ids[i];
      ids[i] = ids[picked];
      ids[picked] = temp;
    }
    return ids.slice(0, count);
  }

  private resetNode(id: string) {
    this.nodes.delete(id);
    this.clearDeadEdges(id);
    const [newId, node] = this.generateNode();
    node.edges = this.pickRandomEdges(newId);
  }

  private clearDeadEdges(id: string) {
    for (const node of this.nodes.values()) {
      node.edges = node.edges.filter(edge => edge !== id);
    }
  }

  // utils
  private isOutBounds(pos: Vector2): boolean {
    if (pos.x < 0 || pos.x > this.rect.width) return true;
    if (pos.y < 0 || pos.y > this.rect.height) return true;
    return false;
  }
}

const g = new CanvasAnimator(canvas);
g.generateNodes();
g.start();
