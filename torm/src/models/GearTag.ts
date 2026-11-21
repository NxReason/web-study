import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { GearItem } from './GearItem.js';

@Entity()
export class GearTag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 64, unique: true })
  name!: string;

  @ManyToMany(() => GearItem, item => item.tags)
  @JoinTable({ name: 'gear_items_to_tags' })
  items!: Relation<GearItem[]>;
}
