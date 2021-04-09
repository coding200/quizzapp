import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserType } from '../type/user.type';
import { UserDto } from '../dto/create-user.dto';
import { SigninDto } from '../dto/sign-in.dto';
import { UserService } from '../service/user.service';
import { TokenType } from '../type/token.type';
// import { GetUser } from './get-user.decorator';
// import { User } from './Entities/user.entity';
// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from './auth-gaurd';

@Resolver()
export class UserResolver {
  constructor(private UserService: UserService) {}

  // Create End User
  @Mutation(() => UserType)
  createUser(@Args('userDto') userDto: UserDto) {
    return this.UserService.createUser(userDto);
  }

  // User SignIn
  @Mutation(() => TokenType)
  // @Mutation(() => UserType)
  SignIn(@Args('signinDto') signinDto: SigninDto) {
    return this.UserService.userSignIn(signinDto);
  }

  // get all user list
  @Query(() => [UserType])
  getUser() {
    return this.UserService.getUser();
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
