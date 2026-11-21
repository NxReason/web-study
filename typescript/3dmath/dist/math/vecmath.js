import Vector3 from './Vector3.js';
export function add(left, right) {
    return new Vector3(left.x + right.x, left.y + right.y, left.z + right.z);
}
export function sub(from, value) {
    return new Vector3(from.x - value.x, from.y - value.y, from.z - value.z);
}
export function scale(scalar, vec) {
    return new Vector3(vec.x * scalar, vec.y * scalar, vec.z * scalar);
}
export function normalize(vec) {
    const len = vec.length();
    if (len === 0.0)
        return vec;
    return new Vector3(vec.x / len, vec.y / len, vec.z / len);
}
export function cross(a, b) {
    return new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
}
export function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}
// P dot Q = P.length * Q.length * cos(angle between P and Q)
export function cosine(a, b) {
    const d = dot(a, b);
    return d / (a.length() * b.length());
}
export function angle(a, b) {
    const c = cosine(a, b);
    return Math.acos(c);
}
export function angleDegrees(a, b) {
    const radians = angle(a, b);
    return (radians * 180) / Math.PI;
}
export function proj(from, to) {
    const projLen = dot(from, to) / to.length();
    return scale(projLen, normalize(to));
}
export function perp(from, to) {
    const projVec = proj(from, to);
    return sub(from, projVec);
}
