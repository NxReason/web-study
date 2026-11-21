import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { Character } from './Character.js';

@Entity()
export class TalentTree {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  points: number = 0;

  @OneToOne(() => Character, char => char.talents, { nullable: false })
  @JoinColumn()
  character!: Relation<Character>;
}
