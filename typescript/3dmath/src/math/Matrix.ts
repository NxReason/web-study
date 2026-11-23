type InputData = number[] | number[][] | Mat4;
function isFlat(data: InputData): data is number[] {
  if (data instanceof Mat4) return false;
  if (typeof data[0] === 'number') return true;
  return false;
}

export default class Mat4 {
  public readonly rows = 4;
  public readonly cols = 4;
  public readonly count = this.rows * this.cols;
  private data: number[] = new Array(this.count);

  constructor(data?: InputData) {
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

  public fill(value: number, from: number = 0, to: number = this.count) {
    for (let i = from; i < to; i++) {
      this.data[i] = value;
    }
  }

  public get(row: number, col: number): number {
    return this.data[row * this.cols + col];
  }

  public set(row: number, col: number, value: number): void {
    this.data[row * this.cols + col] = value;
  }

  public getData(): number[] {
    return this.data;
  }

  public pretty(): void {
    const colWidths = [0, 0, 0, 0];
    const rows: number[][] = [];
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

class Mat<Rows extends number, Cols extends number> {
  private count: number;
  private data: number[];

  constructor(
    public readonly rows: Rows,
    public readonly cols: Cols,
    fill: boolean = true,
  ) {
    this.count = rows * cols;
    this.data = new Array(this.count);

    if (fill) this.fill(0);
  }

  public fill(value: number): void {
    for (let i = 0; i < this.count; i++) {
      this.data[i] = value;
    }
  }

  public get(row: number, col: number): number {
    return this.data[row * this.cols + col];
  }

  public set(row: number, col: number, value: number): void {
    this.data[row * this.cols + col] = value;
  }
}
