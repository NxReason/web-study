interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type N = Dog extends Animal ? number : string;
type S = RegExp extends Animal ? number : string;

// ------------
interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  if (typeof nameOrId === 'string') return { name: nameOrId };
  else return { id: nameOrId };
}

try {
  const data = Math.random() < 0.5 ? 42 : 'John Doe';
  let label = createLabel(data);
  console.log(label);
} catch (err: any) {
  console.error(typeof err);
  console.error(err instanceof String);
  console.error(err instanceof Error);
  console.error(err.message);
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabelGen<T extends number | string>(arg: T): NameOrId<T> {
  if (typeof arg === 'string') return { name: arg } as NameOrId<T>;
  else return { id: arg } as NameOrId<T>;
}

console.log(createLabelGen('hello'));
console.log(createLabelGen(42));

// ---------- cond constraints ------------
type HasMessage = { message: unknown };
type MessageOf<T> = T extends HasMessage ? T['message'] : never;

interface Email {
  message: string;
}
type EmailMessageContents = MessageOf<Email>;
type StringMessageContents = MessageOf<string>;

// ---------- infer ------------
// type Flatten<T> = T extends any[] ? T[number] : T;
type Flatten<T> = T extends Array<infer Item> ? Item : T;

type Str = Flatten<string[]>;
type Num = Flatten<number>;

type GetReturnType<T> = T extends (...args: never[]) => infer Return
  ? Return
  : never;

type NumReturn = GetReturnType<() => number>;

function toLower(str: string): string {
  return str.toLowerCase();
}
type StrReturn = GetReturnType<typeof toLower>;

/*
 * ----- mapped types -----
 */
type BoolsAndNums = {
  [key: string]: boolean | number;
};
const boolsAndNums: BoolsAndNums = {
  foo: 42,
  bar: true,
};

type Flags = {
  msg: string;
  isOn: boolean;
};
type OptionsFlags<T> = {
  [Property in keyof T]: boolean;
};
const flags: OptionsFlags<Flags> = {
  msg: true,
  isOn: true,
};

type Getters<T> = {
  [Property in keyof T as `get${Capitalize<string & Property>}`]: () => T[Property];
};
interface Person {
  name: string;
  age: number;
  location: string;
}
type ReadonlyPerson = Getters<Person>;

/*
 * ----- template literal types -----
 */
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 26,
};

type PropEventSource<T> = {
  on<Key extends string & keyof T>(
    eventName: `${Key}Changed`,
    callback: (newValue: T[Key]) => void,
  ): void;
};

// declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;

// const watchedPerson = makeWatchedObject(person);
// watchedPerson.on('ageChanged', () => {});
