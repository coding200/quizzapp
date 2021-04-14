import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserType } from '../type/user.type';
import { UserDto } from '../dto/create-user.dto';
import { SigninDto } from '../dto/sign-in.dto';
import { UserService } from '../service/user.service';
import { TokenType } from '../type/token.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth-guard';
import { GetUser } from '../get-user.decorator';
import { User } from '../entities/user.entities';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  // Create End User
  @Mutation(() => UserType)
  createUser(@Args('userDto') userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  // User SignIn
  @Mutation(() => TokenType)
  SignIn(@Args('signinDto') signinDto: SigninDto) {
    return this.userService.userSignIn(signinDto);
  }

  // get all user list
  @Query(() => [UserType])
  getUser() {
    return this.userService.getUser();
  }

  // update user status
    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserType)
    updateTask(
      @Args('id') id: number,
      @Args('status') status: boolean,
      @GetUser() user: User,
    ) {
      return this.userService.updateStatus(id, status, user);
    }
}
