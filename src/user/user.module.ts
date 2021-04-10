import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';
import { UserRepository } from './service/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './Jwt/jwt.strategy';
import { AdminRepository } from './service/repository/admin.repository';
import { AdminResolver } from './resolver/admin.resolver';
import { AdminService } from './service/admin.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository, AdminRepository]),
  ],
  providers: [
    UserResolver,
    AdminResolver,
    UserService,
    AdminService,
    JwtStrategy,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
