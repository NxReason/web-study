import type { Repository } from 'typeorm';
import { GearItem } from '../models/GearItem.js';
import { AppDataSource } from '../data-source.js';
import { GearAffix } from '../models/GearAffix.js';
import { GearTag } from '../models/GearTag.js';

class GearExample {
  private gearRepo: Repository<GearItem>;
  private affixRepo: Repository<GearAffix>;
  private tagRepo: Repository<GearTag>;

  constructor() {
    this.gearRepo = AppDataSource.getRepository(GearItem);
    this.affixRepo = AppDataSource.getRepository(GearAffix);
    this.tagRepo = AppDataSource.getRepository(GearTag);
  }

  public async readAllGear(full: boolean = false) {
    return await this.gearRepo.find({
      relations: { affixes: full, tags: full },
    });
  }

  public async createDefaultGear() {
    const gearItem = new GearItem();
    gearItem.name = 'Karui Chopper';
    return await this.gearRepo.save(gearItem);
  }

  public async createDefaultGearWithAffixes() {
    const gearItem = new GearItem();
    gearItem.name = 'Megablood';

    const affix1 = new GearAffix();
    affix1.name = 'Strength';
    affix1.value = 35;

    const affix2 = new GearAffix();
    affix2.name = 'Utility flasks always work';
    affix2.value = 4;

    gearItem.affixes = [affix1, affix2];

    return await this.gearRepo.save(gearItem);
  }

  public async createDefFull() {
    const gearItem1 = new GearItem();
    gearItem1.name = 'Headhunter';

    const hhAffix = new GearAffix();
    hhAffix.name = 'Steal mods';
    hhAffix.value = 30;

    const gearItem2 = new GearItem();
    gearItem2.name = 'Squire';

    const tag1 = new GearTag();
    tag1.name = 'Unique';

    const tag2 = new GearTag();
    tag2.name = 'T0';

    const tag3 = new GearTag();
    tag3.name = 'Belt';

    const tag4 = new GearTag();
    tag4.name = 'Shield';

    gearItem1.tags = [tag1, tag2, tag3];
    gearItem2.tags = [tag1, tag2, tag4];

    await this.gearRepo.save(gearItem1);
    await this.gearRepo.save(gearItem2);

    return [gearItem1, gearItem2];
  }

  public async readTagsAll() {
    return this.tagRepo.find({
      relations: { items: true },
    });
  }
}

/*
 * ----- Examples -----
 */
export async function readTags() {
  const ge = new GearExample();
  const tags = await ge.readTagsAll();
  for (const tag of tags) {
    console.log(`${tag.name} (${tag.items.length} items)`);
    for (const item of tag.items) {
      console.log(`\t${item.name}`);
    }
  }
}

export async function createGearFull() {
  const ge = new GearExample();
  console.log(await ge.createDefFull());
  console.log('-'.repeat(20));
  console.log(await ge.readAllGear(true));
}

export async function createGearWithAffixes() {
  const ge = new GearExample();
  console.log(await ge.createDefaultGearWithAffixes());
}

export async function readAllGear() {
  const ge = new GearExample();
  console.log(await ge.readAllGear());
}
