function match() {}

function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}`);
}

greet('Brendan', new Date());

function sum(a: number, b: number) {
  return a + b;
}

console.log(sum(2, 3));

function printNum(num: number | null) {
  if (num === null) {
    console.log('nothing to print');
    return;
  }
  console.log(`The number is ${num}`);
}

let value: number | null = 42;
printNum(value);

function doubler(values: (number | string)[]) {
  return values.map(val => (val as number) * 2);
}
const values = [4, 8, 15, 16, '23'];
console.log(doubler(values));

interface Name {
  first: string;
  last?: string;
}

function takeLastUpper(name: Name) {
  return name.last?.toUpperCase();
}

console.log(takeLastUpper({ first: 'John' }));

function join(names: string[], separator: string = '') {
  if (names.length === 0) return '';

  let result = names[0];
  for (let i = 1; i < names.length; ++i) {
    result += separator + names[i];
  }
  return result;
}

function capitalize(names: string[]) {
  return names.map(name => {
    if (name === '') return name;

    return name[0].toUpperCase() + name.slice(1);
  });
}

let names: string[] = [];
const sep = ' and ';
console.log(join(names, sep));
names.push('john');
console.log(join(names, sep));
names.push('jane');
console.log(join(names, sep));
names.push('alex');
console.log(join(names, sep));
console.log(join(capitalize(names), sep));

type EvenOdd = [number, string];
function getEvenOdd(value: number): EvenOdd {
  return value % 2 == 0 ? [value, 'even'] : [value, 'odd'];
}

console.log(getEvenOdd(2));
console.log(getEvenOdd(3));

type HttpMethod = 'GET' | 'POST';
function handleRequest(url: string, method: HttpMethod) {
  console.log(`Sending ${method} request to: ${url}`);
}

// const req = { url: 'localhost/users', method: 'GET' as 'GET' };
const req = { url: 'localhost/users', method: 'GET' } as const;
handleRequest(req.url, req.method);
