import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from '../type/user.type';
import { UserDto } from '../dto/create-user.dto';
import { ErrorCode } from '../../common/exceptions';
import { User } from '../entities/user.entities';
import { SigninDto } from '../dto/sign-in.dto';
import { TokenType } from '../type/token.type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../Jwt/jwt-payload.interface';
import { UserRole } from '../entities/user-role.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // create new user
  async createUser(userDto: UserDto): Promise<UserType> {
    const user_present = await this.getUserByName(userDto.username);
    if (user_present) {
      throw new BadRequestException(
        'Username Already Present',
        ErrorCode.SAME_USERNAME,
      );
    }

    return this.userRepository.save({
      ...userDto,
      password: await bcrypt.hash(userDto.password, 12),
    });
  }

  // Sign in
  async userSignIn(SigninDto: SigninDto): Promise<TokenType> {
    const username = await this.validateUserPassword(SigninDto);
    if (!username) {
      throw new UnauthorizedException(
        'Invalid login Credentials',
        ErrorCode.INVALID_CREDENTIALS,
      );
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    const token = new TokenType();
    token.token = accessToken;
    return token;
  }

  async getUserByName(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateStatus(
    id: number,
    status: boolean,
    user: User,
  ): Promise<UserType> {
    if (user.role != UserRole.ADMIN) {
      throw new UnauthorizedException('Access Denied', ErrorCode.ACCESS_DENIED);
    }
    const userData = await this.getUserById(id);
    if (!userData) {
      throw new NotFoundException('user with #${id} not found');
    }
    userData.is_active = status;
    return this.userRepository.save(userData);
  }

  async validateUserPassword(signinDto: SigninDto): Promise<string> {
    const user = await this.getUserByName(signinDto.username);

    if (user.is_active == false) {
      throw new UnauthorizedException('User is Inactive');
    }
    console.log(user);
    if (user && (await user.validatePassword(signinDto.password))) {
      return user.username;
    } else {
      throw new UnauthorizedException(
        'Invalid login credentials',
        ErrorCode.INVALID_CREDENTIALS,
      );
    }
  }
}
