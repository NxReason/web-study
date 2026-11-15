"use strict";
function match() { }
function greet(person, date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}`);
}
greet('Brendan', new Date());
function sum(a, b) {
    return a + b;
}
console.log(sum(2, 3));
function printNum(num) {
    if (num === null) {
        console.log('nothing to print');
        return;
    }
    console.log(`The number is ${num}`);
}
let value = 42;
printNum(value);
function doubler(values) {
    return values.map(val => val * 2);
}
const values = [4, 8, 15, 16, '23'];
console.log(doubler(values));
function takeLastUpper(name) {
    return name.last?.toUpperCase();
}
console.log(takeLastUpper({ first: 'John' }));
function join(names, separator = '') {
    if (names.length === 0)
        return '';
    let result = names[0];
    for (let i = 1; i < names.length; ++i) {
        result += separator + names[i];
    }
    return result;
}
function capitalize(names) {
    return names.map(name => {
        if (name === '')
            return name;
        return name[0].toUpperCase() + name.slice(1);
    });
}
let names = [];
const sep = ' and ';
console.log(join(names, sep));
names.push('john');
console.log(join(names, sep));
names.push('jane');
console.log(join(names, sep));
names.push('alex');
console.log(join(names, sep));
console.log(join(capitalize(names), sep));
function getEvenOdd(value) {
    return value % 2 == 0 ? [value, 'even'] : [value, 'odd'];
}
console.log(getEvenOdd(2));
console.log(getEvenOdd(3));
function handleRequest(url, method) {
    console.log(`Sending ${method} request to: ${url}`);
}
// const req = { url: 'localhost/users', method: 'GET' as 'GET' };
const req = { url: 'localhost/users', method: 'GET' };
handleRequest(req.url, req.method);
