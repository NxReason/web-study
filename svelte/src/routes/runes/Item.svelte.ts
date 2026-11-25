export class Item {
  public name: string;
  public level: number;

  public constructor(name: string = 'New Todo', level: number = 1) {
    this.name = $state(name);
    this.level = $state(level);
  }

  // public upgrade(): void {
  //   this.level++;
  // }
  public upgrade = () => {
    this.level++;
  };
}
