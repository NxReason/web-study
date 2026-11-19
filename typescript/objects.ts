interface Person {
  name: string;
  age: number;
}

interface StringPersonDict {
  [index: number]: Person;
}

const dict: StringPersonDict = {
  // [crypto.randomUUID()]: { name: 'John Doe', age: 42 },
  // [crypto.randomUUID()]: { name: 'Jane Doe', age: 25 },
  42: { name: 'Jane Doe', age: 25 },
};

// -----------------------
let point = [3, 4] as const;

function distanceFromOrigin([x, y]: readonly [number, number]): number {
  return Math.sqrt(x * x + y * y);
}

console.log(distanceFromOrigin([3, 4]));
console.log(distanceFromOrigin(point));
