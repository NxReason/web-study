import fs, { unlink } from 'node:fs/promises';
import path from 'node:path';

async function removeFile(path) {
  try {
    await unlink(path);
    console.log(`successfully deleted ${path}`);
  } catch (err) {
    console.error(`there was an error: ${err.message}`);
  }
}

async function showStats(path) {
  const stats = await fs.stat(path);
  console.log(stats);
}

async function readToBuffer(path) {
  const fHandle = await fs.open(path);
  const buf = Buffer.alloc(47);
  const contentP = fHandle.read(buf.buffer);
  const content = await contentP;

  console.log(content);
  console.log(content.buffer.toString('utf-8'));
  await fHandle.close();
}

async path => {
  const file = await fs.open(path);

  for await (const line of file.readLines()) {
    console.log(line);
  }
};

// problem set
// 1
async function describeFile(filepath) {
  console.log(filepath);

  try {
    const stats = await fs.stat(filepath, { withFileTypes: true });
    console.log('Exists');

    if (stats.isDirectory()) {
      console.log('Directory');
    } else {
      console.log('File');
    }

    if (stats.isFile()) {
      console.log('Size: ', stats.size);
    }

    console.log('Last modified: ', stats.mtime);
  } catch (err) {
    if (err.message.match(/ENOENT/)) {
      console.log('File does not exist');
    } else {
      console.log('Unknown error');
    }
  }

  console.log('-'.repeat(20));
}

await describeFile('./texts');
await describeFile('./texts/lowercase.txt');
await describeFile('./texts/lowercas.txt');

// 2
async function dirScanner(dirPath) {
  console.log(dirPath);
  const result = { files: [], dirs: [], totalFileSize: 0 };

  try {
    const dir = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of dir) {
      if (entry.isFile()) {
        result.files.push(entry);
        const size = (await fs.stat(path.join(dirPath, entry.name))).size;
        result.totalFileSize += size;
      }
      if (entry.isDirectory()) {
        result.dirs.push(entry);
      }
    }
  } catch (err) {
    console.log(err.name);
    console.log(`Can't access directory ${dirPath}`);
  }

  console.log('-'.repeat(20));
  return result;
}

const res = await dirScanner('.');
console.log(res);

// 3
async function findFiles(dirPath, extension) {
  let filepaths = [];
  try {
    const dir = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of dir) {
      if (entry.isFile() && entry.name.endsWith(extension)) {
        filepaths.push(path.join(dirPath, entry.name));
      }

      if (entry.isDirectory()) {
        filepaths = [
          ...filepaths,
          ...(await findFiles(path.join(dirPath, entry.name), '.js')),
        ];
      }
    }
  } catch (err) {
    console.log('Something went wrong: ', err.message);
  }
  return filepaths;
}

const jsFiles = await findFiles('.', '.js');
console.log(jsFiles);
