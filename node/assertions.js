import { Assert } from 'node:assert';

function docs() {
  function sum(a, b) {
    return a + b;
  }

  try {
    const expected = 5;
    const actual = sum(2, 3);
    const err = new assert.AssertionError({
      actual,
      expected,
      operator: 'strictEqual',
    });
    assert.equal(expected, actual, err);
  } catch (e) {
    console.log(e);
  }

  // --------------------------------
  class Foo {
    constructor(a) {
      this.a = a;
    }
  }
  class Bar {
    constructor(a) {
      this.a = a;
    }
  }

  const foo = new Foo(1);
  const bar = new Bar(1);

  // try {
  //   const assert1 = new Assert();
  //   assert1.deepEqual(foo, bar);
  // } catch (err) {
  //   console.log('Assert1 failed');
  //   console.log(err.message);
  // }

  try {
    const assert2 = new Assert({ skipPrototype: true });
    assert2.deepEqual(foo, bar);
  } catch (err) {
    console.log('Assert2 failed');
    console.log(err.message);
  }

  // -------------------
  try {
    assert(sum(2, 3), '2 + 3 not zero');
    assert(sum(2, -2), '2 + -2 not zero');
  } catch (err) {
    console.log(err.message);
  }

  try {
    assert.deepEqual([1, 2, [3, 4]], [1, 2, [3, 4]]);
    assert.deepEqual([1, 2, [3, 4]], [1, 2, [3, '4']]);
  } catch (err) {
    console.log(err.message);
  }

  try {
    assert.match('I will not fail', /fail/);
  } catch (err) {
    console.log(err.message);
  }

  const delayRej = sec => {
    return new Promise((resolve, reject) => {
      setTimeout(reject, sec * 1000);
    });
  };

  try {
    const prom = assert.rejects(delayRej(1), 'delay without rejection');
  } catch (err) {
    console.log(err.message);
  }

  try {
    const act = sum(2, 3);
    const exp = 4;
    assert.equal(act, exp, (a, e) => `Expected: ${e}, got: ${a}`);
  } catch (err) {
    console.log(err.message);
  }
}

// problem set
import { strict as assert } from 'node:assert';

function calculateArea(width, height) {
  assert(width >= 0, `Width must be >= 0, ${width} provided`);
  assert(height >= 0, `Height must be >= 0, ${height} provided`);
  return width * height;
}

function assertCalculateArea() {
  assert.equal(calculateArea(5, 10), 50);
  assert.equal(calculateArea(4, 4), 16);
  assert.equal(calculateArea(0, 10), 0);

  const res = calculateArea(2, 2);
  assert(Number.isFinite(res));
  assert.equal(typeof res, typeof 1);
}

assertCalculateArea();

function charFactory(name = 'John Doe', stats = { hp: 100, attack: 15 }) {
  assert(stats.hp > 0, `Character HP must be > 0, ${stats.hp} provided`);
  return {
    name,
    stats,
  };
}

function assertCharFactory() {
  const defaultChar = charFactory();
  assert(defaultChar.name);
  assert.match(defaultChar.name, /john/i);
  assert.match(defaultChar.name, /doe/i);

  const expectedDefault = { name: 'John Doe', stats: { hp: 100, attack: 15 } };
  assert.equal(defaultChar.name, expectedDefault.name);
  assert(defaultChar.stats);
  assert(defaultChar.stats.hp);
  assert(defaultChar.stats.attack);
  assert.deepEqual(defaultChar.stats, { hp: 100, attack: 15 });
  assert.deepEqual(defaultChar, expectedDefault);

  defaultChar.name = 'Jane Doe';
  // try {
  //   assert.deepEqual(defaultChar, expectedDefault);
  // } catch (err) {
  //   console.log(err.message);
  // }
}

assertCharFactory();

function divide(a, b) {
  if (!Number.isFinite(a))
    throw new TypeError(`enumerator must be a number, got ${typeof a}`);
  if (!Number.isFinite(b))
    throw new TypeError(`denominator must be a number, got ${typeof b}`);

  if (b === 0) throw new RangeError('denominator must be non 0');

  return a / b;
}

function assertDivide() {
  assert.equal(divide(10, 2), 5);

  assert.throws(() => divide('foo', 10), {
    name: 'TypeError',
    message: /enum/i,
  });
  assert.throws(() => divide(10, 'foo'), {
    name: 'TypeError',
    message: /denom/i,
  });
  assert.throws(() => divide(10, 0), { name: 'RangeError', message: /non 0/ });
}

assertDivide();

async function fetchUser(id) {
  function delay(sec, shouldReject = false) {
    return new Promise((resolve, reject) => {
      if (shouldReject) reject();
      else resolve();
    }, sec * 1000);
  }

  await delay(0.1);

  return new Promise((resolve, reject) => {
    if (id > 0) resolve({ id, name: 'User' });
    else reject(new Error('Invalid id'));
  });
}

async function assertFetchUser() {
  assert.deepEqual(await fetchUser(10), { id: 10, name: 'User' });

  await assert.doesNotReject(fetchUser(5));
  await assert.rejects(fetchUser(-1), { message: 'Invalid id' });
}

await assertFetchUser();

class Inventory {
  constructor() {
    this.items = {};
  }

  addItem(name, quant) {
    assert(
      Number.isFinite(quant),
      `Quantity must be a number, ${typeof quant} provided`,
    );

    if (this.items[name] !== undefined) {
      this.items[name] += quant;
    } else {
      this.items[name] = quant;
    }
  }

  getQuantity(name) {
    if (this.items[name]) return this.items[name];
    return 0;
  }
}

function assertInvetory() {
  const inv = new Inventory();
  assert(inv.items);

  inv.addItem('foo', 4);
  inv.addItem('bar', 8);
  assert.equal(inv.getQuantity('foo'), 4);
  assert.equal(inv.getQuantity('bar'), 8);
  assert.equal(inv.getQuantity('baz'), 0);
}

assertInvetory();
