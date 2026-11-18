type Printer = (a: string) => void;

function greeter(fn: Printer) {
  fn('hello world');
}

function printToConsole(msg: string) {
  console.log(msg);
}

greeter(printToConsole);

// construct signatures
class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }
}

class Entity {
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}

type StrConstructor = {
  new (s: string): Person | Entity;
};

function stringFactory(ctor: StrConstructor) {
  return new ctor('John Doe');
}

const p = stringFactory(Entity);
if (p instanceof Person) {
  console.log(p.getName());
} else {
  console.log(p.title);
}

// generics
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

let first = firstElement([4, 8, 15]);
console.log(first);
first = firstElement([]);
console.log(first);

type HasLength = {
  length: number;
};

function longest<Type extends HasLength>(a: Type, b: Type): Type {
  if (a.length > b.length) return a;
  return b;
}

console.log(longest([1, 2], [1, 2, 3]));
console.log(longest('abc', 'defg'));

// overloads
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTs: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTs, d);
  }
  return new Date(mOrTs);
}
console.log(makeDate(1234567));
console.log(makeDate(5, 5, 5));

class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number = 0.0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const v3 = new Vector3(4, 3);

function vecLength({ x, y, z }: Vector3) {
  return Math.sqrt(x * x + y * y + z * z);
}
console.log(vecLength(v3));
