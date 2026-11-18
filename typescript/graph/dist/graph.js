const DEFAULT_STYLE = {
    nodeColor: '#fefefe',
    nodeSize: 20,
    connColor: '#800083',
    connWidth: 3,
};
export default class Graph {
    canvas;
    context;
    name;
    nodes;
    style;
    constructor(canvas, name = 'Graph') {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.name = name;
        this.nodes = {};
        this.style = DEFAULT_STYLE;
    }
    addNodes(data) {
        const ids = new Array(data.length);
        data.forEach((val, index) => {
            const node = new GraphNode(val, { x: 0, y: 0 });
            this.nodes[node.id] = node;
            ids[index] = node.id;
        });
        return ids;
    }
    setPosition(id, pos) {
        this.nodes[id].pos = pos;
    }
    addConnection(fromId, toId) {
        if (this.nodes[fromId] === undefined) {
            console.error(`Trying to add connection from non-existent node ${fromId}`);
            return;
        }
        if (this.nodes[toId] === undefined) {
            console.error(`Trying to add connection to non-existent node ${toId}`);
            return;
        }
        if (this.nodes[fromId].edges.includes(toId))
            return;
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
    drawNode(node) {
        const size = this.style.nodeSize;
        const off = size / 2;
        const { x, y } = node.pos;
        this.context.fillRect(x - off, y - off, size, size);
    }
    drawEdge(fromId, toId) {
        const start = this.nodes[fromId].pos;
        const end = this.nodes[toId].pos;
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke();
        this.context.closePath();
    }
}
export class GraphNode {
    id;
    value;
    edges;
    pos;
    constructor(value, pos) {
        this.id = crypto.randomUUID();
        this.value = value;
        this.edges = [];
        this.pos = pos;
    }
}
