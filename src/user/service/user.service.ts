import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { UserType } from '../type/user.type';
import { UserDto } from '../dto/create-user.dto';
import { ErrorCode } from '../../common/exceptions';
import { User } from '../entities/user.entities';
import { SigninDto } from '../dto/sign-in.dto';
import { TokenType } from '../type/token.type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../Jwt/jwt-payload.interface';
import { UserRole } from '../entities/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // create new user
  async createUser(userDto: UserDto): Promise<UserType> {
    const { username } = userDto;
    const user_present = await this.getUserByName(username);
    if (!user_present) {
      return this.userRepository.createUser(userDto);
    } else {
      throw new BadRequestException(
        'Username Already Present',
        ErrorCode.SAME_USERNAME,
      );
    }
  }

  // Sign in
  async userSignIn(SigninDto: SigninDto): Promise<TokenType> {
    const username = await this.userRepository.validateUserPassword(SigninDto);
    if (!username) {
      throw new UnauthorizedException(
        'Invalid Credentials',
        ErrorCode.INVALID_CREDENTIALS,
      );
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    const token = new TokenType();
    token.token = accessToken;
    return token;
  }
  
  async getUser(): Promise<User[]> {
    return this.userRepository.find();
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
    userData.is_active = status;
    userData.save();
    return userData;
  }
}
