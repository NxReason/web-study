import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { GearAffix } from './GearAffix.js';
import { GearTag } from './GearTag.js';

@Entity()
export class GearItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 128 })
  name!: string;

  @OneToMany(() => GearAffix, affix => affix.gear, { cascade: true })
  affixes!: Relation<GearAffix[]>;

  @ManyToMany(() => GearTag, tag => tag.items, { cascade: true })
  tags!: Relation<GearTag[]>;
}
