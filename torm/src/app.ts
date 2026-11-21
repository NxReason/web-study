import 'reflect-metadata';

import { AppDataSource } from './data-source.js';

import { createGearFull, readTags } from './examples/Gear.js';

await AppDataSource.initialize();

try {
  await readTags();
} catch (error: any) {
  const msg = typeof error === 'string' ? error : error.message;
  console.error(`ERROR: ${msg}`);
} finally {
  await AppDataSource.destroy();
}
