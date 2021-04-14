import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../entities/user.entities';
import { UserDto } from '../../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserType } from '../../type/user.type';
import { ErrorCode } from '../../../common/exceptions';
import { SigninDto } from '../../dto/sign-in.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // create new user
  async createUser(userDto: UserDto): Promise<UserType> {
    const {
      first_name,
      last_name,
      phone,
      email,
      username,
      password,
      role,
    } = userDto;
    const user = new User();
    user.first_name = first_name;
    user.last_name = last_name;
    user.phone = phone;
    user.email = email;
    user.username = username;
    user.password = await this.hashPassword(password);
    user.role = role;
    user.save();
    return user;
  }

  // validate password for SignIn
  async validateUserPassword(signinDto: SigninDto): Promise<string> {
    const { username, password } = signinDto;
    const user = await this.findOne({ username });

    if (user.is_active == false) {
      throw new HttpException('User is Inactive', HttpStatus.BAD_REQUEST);
    }

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      throw new UnauthorizedException(
        'Wrong Password',
        ErrorCode.INVALID_CREDENTIALS,
      );
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
