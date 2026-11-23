import Mat4 from './Matrix.js';
export function transpose(mat) {
    const copy = new Mat4(mat);
    for (let row = 0; row < mat.rows; row++) {
        for (let col = 0; col < mat.cols; col++) {
            copy.set(col, row, mat.get(row, col));
        }
    }
    return copy;
}
