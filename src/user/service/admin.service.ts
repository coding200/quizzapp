import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from '../type/user.type';
import { UserDto } from '../dto/create-user.dto';
import { ErrorCode } from 'src/common/exceptions';
import { Admin } from '../entities/admin.entities';
import { SigninDto } from '../dto/sign-in.dto';
// import * as bcrypt from 'bcrypt';
import { TokenType } from '../type/token.type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../Jwt/jwt-payload.interface';
import { AdminRepository } from './repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
    private jwtService: JwtService,
  ) {}

  // create new user
  async createAdmin(userDto: UserDto): Promise<UserType> {
    const { username } = userDto;
    const user_present = await this.getUserByName(username);
    if (!user_present) {
      return this.adminRepository.createAdmin(userDto);
    } else {
      throw new BadRequestException(
        'Username Already Present',
        ErrorCode.SAME_USERNAME,
      );
    }
  }

  // Sign in
  async adminSignIn(SigninDto: SigninDto): Promise<TokenType> {
    const username = await this.adminRepository.validateUserPassword(SigninDto);
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

  // list all user
  async getAdmin(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async getUserByName(username: string): Promise<Admin> {
    return this.adminRepository.findOne({ where: { username } });
  }
}
