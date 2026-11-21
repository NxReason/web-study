export default class Vector3 {
  public x: number = 0.0;
  public y: number = 0.0;
  public z: number = 0.0;

  constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  public normalize(): Vector3 {
    const len = this.length();
    if (len === 0.0) return this;
    this.x /= len;
    this.y /= len;
    this.z /= len;
    return this;
  }

  public add(other: Vector3): Vector3 {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  }

  public sub(other: Vector3): Vector3 {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  }

  public scale(scalar: number): Vector3 {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }
}
