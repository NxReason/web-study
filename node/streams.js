import stream, { finished, pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';
import fs from 'node:fs';

async function run() {
  function processChunk(text) {
    return text.toUpperCase();
  }
  await stream.pipeline(
    fs.createReadStream('texts/lowercase.txt'),
    async function* (source, { signal }) {
      source.setEncoding('utf-8'); // work with strings other buffers
      for await (const chunk of source) {
        yield await processChunk(chunk, { signal });
      }
    },
    fs.createWriteStream('texts/uppercase.txt'),
  );
  console.log('Pipeline succeeded');

  const uppercase = new Transform({
    transform(chunk, encoding, callback) {
      const result = chunk.toString().toUpperCase();
      callback(null, result);
    },
  });

  uppercase.on('data', chunk => {
    console.log(chunk.toString());
  });

  uppercase.write('hello');
  uppercase.write('world');
  uppercase.end();
}

await run();

// problem set
// 1
function readFile() {
  const rs = fs.createReadStream('texts/lowercase.txt');

  let totalSize = 0;
  rs.on('data', chunk => {
    console.log('reading buffer chunk');

    console.log(chunk.toString());

    totalSize += chunk.length;
  });

  rs.on('end', () => {
    console.log('\ntotal size: ', totalSize);
  });
}
function readFile2() {
  const rs = fs.createReadStream('texts/lowercase.txt', { encoding: 'utf-8' });

  let totalChars = 0;
  rs.on('data', chunk => {
    console.log('reading utf-8 chunk');

    console.log(chunk);

    totalChars += chunk.length;
  });

  rs.on('end', () => {
    console.log(`total characters: ${totalChars}`);
  });
}
readFile();
readFile2();

async function copyFile() {
  const rs = fs.createReadStream('texts/lowercase.txt');
  const ws = fs.createWriteStream('texts/lowercase-copy.txt');

  rs.pipe(ws);

  await finished(ws);
  console.log('copied');
}

await copyFile();

async function transformText() {
  const rs = fs.createReadStream('texts/lowercase.txt');

  let totalSize = 0;
  const transform = new Transform({
    transform(chunk, encoding, callback) {
      totalSize += chunk.length;
      const result = chunk.toString().toLowerCase();
      callback(null, result);
    },
  });

  let afterSpace = false;
  const SPACE = Buffer.from(' ')[0];
  const whiteSpaceShrink = new Transform({
    transform(chunk, encoding, callback) {
      let cleared = Buffer.alloc(chunk.length);
      let clearedIndex = 0;
      for (let i = 0; i < chunk.length; ++i) {
        // process spaces
        if (chunk[i] === SPACE) {
          if (!afterSpace) {
            cleared[clearedIndex++] = chunk[i];
          }
          afterSpace = true;
        } else {
          cleared[clearedIndex++] = chunk[i];
          afterSpace = false;
        }
      }
      callback(null, Buffer.copyBytesFrom(cleared, 0, clearedIndex));
    },
  });

  const ws = fs.createWriteStream('texts/lowercase-transformed.txt');

  await pipeline(rs, whiteSpaceShrink, transform, ws);
  console.log('transformed, total size: ', totalSize);
}

await transformText();

async function splitFile() {
  const CHUNK_SIZE = 16;
  const rs = fs.createReadStream('texts/lowercase.txt', { highWaterMark: 5 });

  let index = 0;
  let bytesWritten = 0;
  let ws = fs.createWriteStream(`texts/lowercase-chunked-${index}.txt`);
  for await (const chunk of rs) {
    if (chunk.length + bytesWritten <= CHUNK_SIZE) {
      ws.write(chunk);
      bytesWritten += chunk.length;
      continue;
    }

    const bytesLeft = CHUNK_SIZE - bytesWritten;
    ws.write(chunk.subarray(0, bytesLeft));
    ws.end();

    await finished(ws);

    index++;
    bytesWritten = chunk.length - bytesLeft;
    ws = fs.createWriteStream(`texts/lowercase-chunked-${index}.txt`);
    ws.write(chunk.subarray(bytesLeft));
  }
  ws.end();
  await finished(ws);

  // rs.on('data', chunk => {
  //   if (chunk.length + bytesWritten <= CHUNK_SIZE) {
  //     ws.write(chunk);
  //     bytesWritten += chunk.length;
  //     return;
  //   }

  //   const bytesLeft = CHUNK_SIZE - bytesWritten;
  //   ws.write(chunk.subarray(0, bytesLeft));
  //   ws.end();

  //   index++;
  //   bytesWritten = chunk.length - bytesLeft;
  //   ws = fs.createWriteStream(`texts/lowercase-chunked-${index}.txt`);
  //   ws.write(chunk.subarray(bytesLeft));
  // });
  // ws.end();
}

await splitFile();
