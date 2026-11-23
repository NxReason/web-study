function isFlat(data) {
    if (data instanceof Mat4)
        return false;
    if (typeof data[0] === 'number')
        return true;
    return false;
}
export default class Mat4 {
    rows = 4;
    cols = 4;
    count = this.rows * this.cols;
    data = new Array(this.count);
    constructor(data) {
        if (!data) {
            this.fill(0);
            return;
        }
        if (data instanceof Mat4) {
            data = data.getData();
        }
        if (isFlat(data)) {
            let filledCount = Math.min(this.count, data.length);
            for (let i = 0; i < filledCount; i++) {
                this.data[i] = data[i];
                this.fill(0, filledCount);
            }
            return;
        }
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                let index = row * this.cols + col;
                this.data[index] = data[row][col];
            }
        }
    }
    fill(value, from = 0, to = this.count) {
        for (let i = from; i < to; i++) {
            this.data[i] = value;
        }
    }
    get(row, col) {
        return this.data[row * this.cols + col];
    }
    set(row, col, value) {
        this.data[row * this.cols + col] = value;
    }
    getData() {
        return this.data;
    }
    pretty() {
        const colWidths = [0, 0, 0, 0];
        const rows = [];
        for (let row = 0; row < this.rows; row++) {
            rows[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const value = this.get(row, col);
                rows[row].push(value);
                if (String(value).length > colWidths[col])
                    colWidths[col] = String(value).length;
            }
        }
        // (`|   |`) + sum(col width + 2 paddings)
        const totalWidth = colWidths.reduce((prev, curr) => prev + curr + 2, 0);
        console.log('--' + ' '.repeat(totalWidth) + '--');
        for (const row of rows) {
            let rowStr = '| ';
            for (let col = 0; col < this.cols; col++) {
                const strVal = String(row[col]);
                rowStr += ` ${strVal.padStart(colWidths[col], ' ')} `;
            }
            rowStr += ' |';
            console.log(rowStr);
        }
        console.log('--' + ' '.repeat(totalWidth) + '--');
    }
}
class Mat {
    rows;
    cols;
    count;
    data;
    constructor(rows, cols, fill = true) {
        this.rows = rows;
        this.cols = cols;
        this.count = rows * cols;
        this.data = new Array(this.count);
        if (fill)
            this.fill(0);
    }
    fill(value) {
        for (let i = 0; i < this.count; i++) {
            this.data[i] = value;
        }
    }
    get(row, col) {
        return this.data[row * this.cols + col];
    }
    set(row, col, value) {
        this.data[row * this.cols + col] = value;
    }
}
