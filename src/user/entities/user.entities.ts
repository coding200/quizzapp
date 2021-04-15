import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-role.enum';
import { Participant } from '../../participants/enitities/participants.entity';
import { BaseEntity } from '../../common/BaseEntity';

@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ nullable: false })
  role: UserRole;

  async validatePassword(password: string): Promise<boolean> {
    console.log(password, this.password);
    const match = await bcrypt.compare(password, this.password);
    return match;
  }
}
