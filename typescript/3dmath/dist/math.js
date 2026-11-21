import Vector3 from './Vector3.js';
export function vecAdd(left, right) {
    return new Vector3(left.x + right.x, left.y + right.y, left.z + right.z);
}
export function vecSub(from, value) {
    return new Vector3(from.x - value.x, from.y - value.y, from.z - value.z);
}
export function vecScale(scalar, vec) {
    return new Vector3(vec.x * scalar, vec.y * scalar, vec.z * scalar);
}
export function vecNormalized(vec) {
    const len = vec.length();
    if (len === 0.0)
        return vec;
    return new Vector3(vec.x / len, vec.y / len, vec.z / len);
}
export function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}
// P dot Q = P.length * Q.length * cos(angle between P and Q)
export function vecCosine(a, b) {
    const d = dot(a, b);
    return d / (a.length() * b.length());
}
export function vecAngle(a, b) {
    const cosine = vecCosine(a, b);
    return Math.acos(cosine);
}
export function vecAngleDegrees(a, b) {
    const radians = vecAngle(a, b);
    return (radians * 180) / Math.PI;
}
export function vecProj(from, to) {
    const projLen = dot(from, to) / to.length();
    return vecScale(projLen, vecNormalized(to));
}
