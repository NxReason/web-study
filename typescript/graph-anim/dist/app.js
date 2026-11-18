"use strict";
const canvas = document.getElementById('canvas');
class CanvasAnimator {
    canvas;
    context;
    lastTime = 0;
    frameId = null;
    rect;
    // draw data
    radius = 50;
    size = 20;
    center = { x: 0, y: 0 };
    current = { x: this.radius, y: 0 };
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
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
    start() {
        if (this.frameId !== null)
            return;
        this.lastTime = performance.now();
        this.frameId = requestAnimationFrame(this.loop);
    }
    stop() {
        if (this.frameId !== null) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }
    loop = (currentTime) => {
        const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;
        this.update(dt);
        this.draw();
        this.frameId = requestAnimationFrame(this.loop);
    };
    totalTime = 0;
    speed = 2;
    update(delta) {
        this.totalTime += delta * this.speed;
        this.current.x = this.center.x + Math.cos(this.totalTime) * this.radius;
        this.current.y = this.center.y + Math.sin(this.totalTime) * this.radius;
    }
    draw() {
        this.context.clearRect(0, 0, this.rect.width, this.rect.height);
        this.context.fillStyle = '#fefefe';
        this.context.fillRect(this.current.x - this.size / 2, this.current.y - this.size / 2, 20, 20);
    }
}
const g = new CanvasAnimator(canvas);
g.start();
