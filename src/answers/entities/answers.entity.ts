import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/BaseEntity';

@Entity('answers')
export class Answer extends BaseEntity {
  @Column()
  part_id: number;

  @Column()
  ques_id: number;

  @Column()
  opt_id: number;

  @Column()
  is_correct: boolean;
}
