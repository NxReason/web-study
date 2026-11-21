import { Not, type Repository } from 'typeorm';
import { Character } from '../models/Character.js';
import { AppDataSource } from '../data-source.js';
import { TalentTree } from '../models/TalentTree.js';

type Optional<T> = {
  [Prop in keyof T]+?: T[Prop];
};
// type OptionalNoId<T> = {
//   [Prop in keyof T as Exclude<Prop, 'id'>]?: T[Prop];
// };
type OptionalNoId<T> = Omit<Optional<T>, 'id'>;
type OptChar = Optional<Character>;
type OptCharNoId = OptionalNoId<Character>;

export class CharExample {
  private repo: Repository<Character>;
  private treeRepo: Repository<TalentTree>;

  constructor() {
    this.repo = AppDataSource.getRepository(Character);
    this.treeRepo = AppDataSource.getRepository(TalentTree);
  }

  public async readAll(): Promise<Character[]> {
    return await this.repo.find();
    // return await AppDataSource.manager.find(Character);
  }

  public async readOneById(id: number): Promise<Character | null> {
    return await this.repo.findOneBy({ id });
  }

  public async readOneBy(query: Optional<Character>) {
    return await this.repo.findOneBy(query);
  }

  public async create(char: Character): Promise<void> {
    await this.repo.save(char);
  }

  public async createDefault(): Promise<Character> {
    const char = new Character();
    char.name = 'John Doe';
    await this.repo.save(char);
    return char;
  }

  public async update(
    id: number,
    char: OptionalNoId<Character>,
  ): Promise<Character | null> {
    const dbChar = await this.repo.findOneBy({ id });
    if (!dbChar) return null;

    this.updateFields(dbChar, char);

    await this.repo.save(dbChar);

    return dbChar;
  }
  private updateFields(dbChar: Character, newData: OptionalNoId<Character>) {
    if (newData.name) dbChar.name = newData.name;
    if (newData.level) dbChar.level = newData.level;
    if (newData.class) dbChar.class = newData.class;
    if (newData.desc) dbChar.desc = newData.desc;
  }

  public async delete(id: number) {
    const rmChar = await this.repo.findOneBy({ id });
    if (!rmChar) return null;
    return await this.repo.remove(rmChar);
  }

  // Talent tree
  public async createTalentTree(char: Character) {
    const tree = new TalentTree();
    tree.character = char;
    await this.treeRepo.save(tree);
  }

  public async readTalentTrees() {
    return await this.treeRepo.find({
      relations: { character: true },
    });
  }

  public async loadCharsWithTalents() {
    // return await this.repo.find({
    //   relations: { talents: true },
    // });

    const chars = await this.repo
      .createQueryBuilder('characters')
      .innerJoinAndSelect('characters.talents', 'talent_tree')
      .getMany();
    return chars;
  }

  public async createDefWithTalents() {
    const newChar = new Character();
    newChar.name = 'Talentful';

    const talents = new TalentTree();
    newChar.talents = talents;

    return await this.repo.save(newChar);
  }
}

/*
 * ----- Examples -----
 */
export async function createDefWithTalents() {
  const ce = new CharExample();
  console.log(await ce.createDefWithTalents());
  console.log('-'.repeat(20));
  const chars = await ce.readAll();
  const talents = await ce.readTalentTrees();
  console.log(chars);
  console.log('-'.repeat(20));
  console.log(talents);
  console.log('-'.repeat(20));
  console.log(`Chars - ${chars.length}, trees - ${talents.length}`);
}

export async function loadCharsWithTalents() {
  const ce = new CharExample();
  console.log(await ce.loadCharsWithTalents());
}

export async function createTalentTree() {
  const ce = new CharExample();
  const char = await ce.createDefault();
  await ce.createTalentTree(char);
  console.log(await ce.readTalentTrees());
}

export async function createDefaultChar() {
  const ce = new CharExample();

  const defChar = await ce.createDefault();
  console.log(defChar);

  console.log(await ce.readOneById(defChar.id));
  console.log(await ce.readOneBy({ name: 'John Doe' }));
  // console.log(await ce.readAll());
}

export async function updateChar() {
  const ce = new CharExample();

  const updData = { name: 'Jane Doe', class: 'Ranger' };
  const updated = await ce.update(7, updData);
  console.log(updated);

  console.log(await ce.readAll());
}

export async function deleteChar() {
  const ce = new CharExample();

  const rmChar = await ce.delete(6);
  console.log(rmChar);
  console.log('-'.repeat(20));
  console.log(await ce.readAll());
}
