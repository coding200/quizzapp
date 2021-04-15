import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Admin } from 'src/user/entities/admin.entities';
// import { BaseEntity } from '../../common/BaseEntity';

@Entity('quizes')
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  created_by: number;

  // @ManyToOne(() => Admin, (user) => user.quizes)
  // @JoinColumn({ name: 'created_by' })
  // user: Admin;
}
