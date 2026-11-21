export default class Vector3 {
    x = 0.0;
    y = 0.0;
    z = 0.0;
    constructor(x = 0.0, y = 0.0, z = 0.0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
    normalize() {
        const len = this.length();
        if (len === 0.0)
            return this;
        this.x /= len;
        this.y /= len;
        this.z /= len;
        return this;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }
    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
}
