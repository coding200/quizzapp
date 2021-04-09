import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserType } from '../type/user.type';
import { UserDto } from '../dto/create-user.dto';
import { SigninDto } from '../dto/sign-in.dto';
import { AdminService } from '../service/admin.service';
import { TokenType } from '../type/token.type';
// import { GetUser } from './get-user.decorator';
// import { User } from './Entities/user.entity';
// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from './auth-gaurd';

@Resolver()
export class AdminResolver {
  constructor(private adminService: AdminService) {}

  // Create End User
  @Mutation(() => UserType)
  createAdmin(@Args('userDto') userDto: UserDto) {
    return this.adminService.createAdmin(userDto);
  }

  // User SignIn
  @Mutation(() => TokenType)
  // @Mutation(() => UserType)
  adminSignIn(@Args('signinDto') signinDto: SigninDto) {
    return this.adminService.adminSignIn(signinDto);
  }

  // get all user list
  @Query(() => [UserType])
  getAdmin() {
    return this.adminService.getAdmin();
  }

  // update user status
  //   @UseGuards(GqlAuthGuard)
  //   @Mutation(() => UserType)
  //   updateTask(
  //     @Args('id') id: number,
  //     @Args('status') status: boolean,
  //     @GetUser() user: User,
  //   ) {
  //     return this.authService.updateStatus(id, status, user);
  //   }
}
