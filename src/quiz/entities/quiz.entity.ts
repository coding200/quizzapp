import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Admin } from 'src/user/entities/admin.entities';

@Entity('Quizes')
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Admin, (user) => user.quizes)
  user: Admin;

  @Column()
  created_by: string;
}
