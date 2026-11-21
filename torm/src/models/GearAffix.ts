import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { GearItem } from './GearItem.js';

@Entity()
export class GearAffix {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 64 })
  name!: string;

  @Column({ type: 'real' })
  value!: number;

  @ManyToOne(() => GearItem, item => item.affixes, { nullable: false })
  gear!: Relation<GearItem>;
}
