function identity<Type>(arg: Type): Type {
  return arg;
}

console.log(identity(4));
console.log(identity('hello'));
const value: number = 42;
console.log(identity(value));

interface GenericIdentityFn<T> {
  (arg: T): T;
}

function numIdentity(x: number) {
  return x;
}
function strIdentity(str: string) {
  return str;
}

let myIdentity: GenericIdentityFn<number> = numIdentity;

interface HasLength {
  length: number;
}

function loggingIdentity<T extends HasLength>(value: T): T {
  console.log(value.length);
  return value;
}

console.log(loggingIdentity('hello'));
console.log(loggingIdentity([42, 4]));

function getProperty<Obj, Key extends keyof Obj>(obj: Obj, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3 };
console.log(getProperty(x, 'a'));
// console.log(getProperty(x, 'm'));

function create<T>(c: { new (): T }): T {
  return new c();
}

function temp(value: string, x: number): void;
function temp(x: number): void;
function temp(first: string | number, second?: number) {
  if (typeof first === 'number') {
    console.log(`Square of ${first} is ${first ** 2}`);
  } else {
    console.log(first.repeat(second!));
  }
}
temp(4);
temp('hello', 2);

// covariance / contrvariance

interface Animal {
  name: string;
}
interface Cat extends Animal {
  speak: () => void;
}

const cat: Cat = {
  name: 'Tom',
  speak: () => {
    console.log('meow');
  },
};

interface Producer<T> {
  make(): T;
}

let animalProducer: Producer<Animal> = {
  make() {
    return {
      name: 'Tom',
      speak: () => {
        console.log('meow');
      },
    };
  },
};

// animalProducer = {
//   make() {
//     return {
//       name: 'Jerry'
//     }
//   }
// }

function isCat(animal: any): animal is Cat {
  const hasName = animal.name !== undefined && typeof animal.name === 'string';
  const canSpeak =
    animal.speak !== undefined && typeof animal.speak === 'function';
  return hasName && canSpeak;
}

const animal = animalProducer.make();
if (isCat(animal)) {
  animal.speak();
}

interface Consumer<T> {
  use: (val: T) => void;
}

const animalConsumer: Consumer<Cat> = {
  use(animal: Animal) {
    console.log(`Animal name's is ${animal.name}`);
  },
};

animalConsumer.use(cat);
