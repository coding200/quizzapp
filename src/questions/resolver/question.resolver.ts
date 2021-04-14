import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { QuesType } from '../type/question-type';
import { CreateQuesDto } from 'src/questions/dto/create-question.dto';
import { QuesService } from '../service/ques.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/auth-guard';

@Resolver(QuesType)
@UseGuards(GqlAuthGuard)
export class QuesResolver {
  constructor(private quesService: QuesService) {}
  @Mutation(() => QuesType)
  createQues(@Args('createQuesDto') createQuesDto: CreateQuesDto) {
    return this.quesService.createQues(createQuesDto);
  }

  @Query(() => [QuesType])
  getQues() {
    return this.quesService.getQues();
  }

  @Mutation(() => QuesType)
  updateQues(@Args('id') id: number, @Args('status') status: boolean) {
    return this.quesService.updateQuesStatus(id, status);
  }
}
