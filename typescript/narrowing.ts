function padLeft(padding: number | string, input: string): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input;
  }
  return padding + input;
}

console.log(padLeft(6, 'world'));
console.log(padLeft('hello ', 'world'));

function printAll(values: string | string[] | null = null) {
  if (values && typeof values === 'object') {
    for (const val of values) {
      console.log(val);
    }
  } else {
    console.log(values);
  }
}

printAll();
printAll('hello');
printAll(['hello', 'world']);

// "in" operator
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim();
  }
  return animal.fly();
}

function getSmallPet(): Bird | Fish {
  const fish = {
    swim() {
      console.log('am swimming');
    },
  };
  const bird = {
    fly() {
      console.log('am flying');
    },
  };
  return Math.random() < 0.5 ? fish : bird;
}

// custom type predicate
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

const pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

const zoo = [getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet()];
const fishes = zoo.filter(animal => isFish(animal));
for (const fish of fishes) {
  fish.swim();
}

// discriminated unions
interface Circle {
  kind: 'circle';
  radius: number;
}
interface Square {
  kind: 'square';
  sideLength: number;
}
interface Rect {
  kind: 'rect';
  width: number;
  height: number;
}

type Shape = Circle | Square | Rect;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI ** (shape.radius ** 2);
    case 'square':
      return shape.sideLength ** 2;
    case 'rect':
      return shape.width * shape.height;
    default:
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
  }
}

class CircleClass {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class SquareClass {
  sideLength: number;

  constructor(sideLength: number) {
    this.sideLength = sideLength;
  }

  getArea(): number {
    return this.sideLength ** this.sideLength;
  }
}

type ShapeClass = CircleClass | SquareClass;

function getRandomShape(): ShapeClass {
  return Math.random() < 0.5 ? new CircleClass(0.5) : new SquareClass(1.0);
}

const shapeInstance = getRandomShape();
console.log(shapeInstance.getArea());
if (shapeInstance instanceof CircleClass) {
  console.log('Radius is ', shapeInstance.radius);
} else {
  console.log('Side length is ', shapeInstance.sideLength);
}
