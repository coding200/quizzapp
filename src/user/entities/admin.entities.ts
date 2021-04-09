import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { Task } from '../../task/Entities/task.entity';

@Entity('admins')
@Unique(['username'])
// @Unique(['phone'])
// @Unique(['email'])
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  //   @Column()
  //   salt: string;

  //   @Column({ nullable: true })
  //   role: UserRole;

  //   @OneToMany(() => Task, (task) => task.user)
  //   tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.password);
    return match == true;
  }
}
