import { DataSource } from 'typeorm';
import { User } from './models/User.js';
import { Photo } from './models/Photo.js';
import { Character } from './models/Character.js';
import { TalentTree } from './models/TalentTree.js';
import { GearItem } from './models/GearItem.js';
import { GearAffix } from './models/GearAffix.js';
import { GearTag } from './models/GearTag.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'torm',
  synchronize: true,
  logging: false,
  entities: [User, Photo, Character, TalentTree, GearItem, GearAffix, GearTag],
});
