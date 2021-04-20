import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { QuizType } from './type/quiz.type';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { GqlAuthGuard } from '../common/auth-guard';
import { User } from '../user/entities/user.entities';
import { GetUser } from '../user/get-user.decorator';

@Resolver('QuizType')
@UseGuards(GqlAuthGuard)
export class QuizResolver {
  constructor(private quizService: QuizService) {}

  // Create Quiz
  @Mutation(() => QuizType)
  createQuiz(
    @Args('createQuizDto') createQuizDto: CreateQuizDto,
    @GetUser() user: User,
  ) {
    return this.quizService.createQuiz(createQuizDto, user);
  }

  // Retrieve all quizes
  @Query(() => [QuizType])
  getQuiz() {
    return this.quizService.getQuiz();
  }
}
