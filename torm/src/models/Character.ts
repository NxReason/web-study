import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { TalentTree } from './TalentTree.js';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 12 })
  class: string = 'Witch';

  @Column({ nullable: true, length: 512 })
  desc!: string;

  @Column()
  level: number = 1;

  @OneToOne(() => TalentTree, talentTree => talentTree.character, {
    cascade: true,
  })
  talents?: Relation<TalentTree>;
}
