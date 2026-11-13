import { strict as assert } from 'node:assert';

async function docs() {
  let buf = Buffer.from('hello');
  for (let [index, byte] of buf.entries()) {
    console.log(`At ${index}: ${byte}, str: ${String.fromCharCode(byte)}`);
  }
  console.log('-'.repeat(20));

  buf = Buffer.allocUnsafe(26);
  for (let i = 0; i < 26; i++) {
    buf[i] = i + 97;
  }
  let bufShared = buf.subarray(0, 3);
  console.log(bufShared.toString('ascii', 0, bufShared.length));

  const f = new File(buf, 'alphabet');
  console.log(f);
}

// await docs();

// problem set
// 1
function stringToHex(str) {
  const buf = Buffer.from(str);
  return buf.toString('hex');
}

function hexToString(hex) {
  const buf = Buffer.from(hex, 'hex');
  return buf.toString('utf-8');
}

function stringConvert() {
  let source = 'hello';
  let hex = stringToHex(source);
  assert.equal(hexToString(hex), source);

  source = 'привет';
  hex = stringToHex(source);
  assert.equal(hexToString(hex), source);
}

stringConvert();

// 2
function mergeBuffers(buffers, limit = -1) {
  if (limit >= 0) {
    return Buffer.concat(buffers, limit);
  }
  return Buffer.concat(buffers);
}

function areBuffersEqual(first, second) {
  if (first.length !== second.length) return false;

  for (let i = 0; i < first.length; ++i) {
    if (first[i] !== second[i]) return false;
  }

  return true;
}

function compareBuffers() {
  const buf1 = Buffer.from([1, 2, 3]);
  const buf1Copy = Buffer.copyBytesFrom(buf1);
  const buf2 = Buffer.from([1, 2, 3, 4]);
  const buf2Copy = mergeBuffers([buf1, Buffer.from([4])]);
  const buf3 = Buffer.from('hello');
  const buf3Copy = mergeBuffers([
    Buffer.from('h'),
    Buffer.from('e'),
    Buffer.from('l'),
    Buffer.from('l'),
    Buffer.from('o'),
  ]);
  const emptyBuf1 = Buffer.alloc(0);
  const emptyBuf2 = Buffer.from([]);

  assert(areBuffersEqual(emptyBuf1, emptyBuf2));
  assert(areBuffersEqual(buf1, buf1Copy));
  assert(areBuffersEqual(buf2, buf2Copy));
  assert(areBuffersEqual(buf3, buf3Copy));

  assert(!areBuffersEqual(buf1, buf2));
  assert(!areBuffersEqual(buf2, buf1));
  assert(!areBuffersEqual(buf1, Buffer.from([])));
}

compareBuffers();

// 3
function serializeNumbers(numbers) {
  const buf = Buffer.allocUnsafe(numbers.length * 2);
  for (let i = 0; i < numbers.length; ++i) {
    buf.writeUInt16BE(numbers[i], i * 2);
  }
  return buf;
}

function deserializeNumbers(buf) {
  const numbers = Array(buf.length / 2);

  for (let i = 0; i < numbers.length; ++i) {
    numbers[i] = buf.readUInt16BE(i * 2);
  }

  return numbers;
}

function runSerialize() {
  const values = [4, 8, 15, 16, 23, 42];
  const buf = serializeNumbers(values);
  console.log(buf);
  const des = deserializeNumbers(buf);
  console.log(des);
}

runSerialize();

// 4
function splitBuffer(buffer, chunkSize) {
  const chunkCount = Math.ceil(buffer.length / chunkSize);

  const chunks = Array(chunkCount);

  for (let i = 0; i < chunkCount; ++i) {
    chunks[i] = Buffer.from(
      buffer.subarray(chunkSize * i, chunkSize * (i + 1)),
    );
  }

  return chunks;
}

function range(min, max) {
  const arr = Array(max - min);
  const offset = min;

  while (min < max) {
    arr[min - offset] = min;
    min++;
  }

  return arr;
}

function runSplitBuffers() {
  const source = Buffer.from(range(1, 10));

  const chunks = splitBuffer(source, 3);
  const restored = mergeBuffers(chunks);
  console.log(restored);
}

runSplitBuffers();

// 5
// packet structure
// version - 1 byte UInt8
// message id - 2 bytes UInt16Be
// payload length - 4 bytes UInt32BE
// payload - variable raw bytes

function isValidMeta(version, messageId, len) {
  if (version < 0 || version > 2 ** 8) return false;
  if (messageId < 0 || messageId > 2 ** 16) return false;
  if (len < 0 || len > 2 ** 32) return false;
  return true;
}

function encodePacket(version, messageId, payload) {
  const payloadBuffer = Buffer.from(payload);
  const payloadLength = payloadBuffer.length;

  if (!isValidMeta(version, messageId, payloadLength)) return Buffer.from([]);

  const metaBuffer = Buffer.allocUnsafe(7);

  metaBuffer.writeUInt8(version);
  metaBuffer.writeUInt16BE(messageId, 1);
  metaBuffer.writeUInt32BE(payloadLength, 3);

  return Buffer.concat([metaBuffer, payloadBuffer]);
}

function decodePacket(buffer) {
  return {
    version: buffer.readUInt8(0),
    messageId: buffer.readUInt16BE(1),
    payloadLength: buffer.readUInt32BE(3),
    payload: Buffer.from(buffer.subarray(7)),
  };
}

function runEncoder() {
  const buffer = encodePacket(4, 56, 'hello');
  const packet = decodePacket(buffer);
  console.log(packet);
  console.log('payload: ', packet.payload.toString('utf-8'));
}

runEncoder();
