import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AnswerType } from './type/answers.type';
import { AnswersService } from './answers.service';
import { CreateAnsDto } from './dto/answers.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/auth-guard';

@Resolver(AnswerType)
@UseGuards(GqlAuthGuard)
export class AnswersResolver {
  constructor(private ansService: AnswersService) {}

  @Mutation(() => AnswerType)
  submitAns(@Args('createAnsDto') createAnsDto: CreateAnsDto) {
    return this.ansService.submitAns(createAnsDto);
  }

  // @Query(() => [AnswerType])
  // getAns() {
  //   return this.ansService.getAns();
  // }

  @Query(() => [AnswerType])
  getAns(id: number) {
    return this.ansService.getUserAns(id);
  }
}
