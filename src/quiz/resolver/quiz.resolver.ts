import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { QuizType } from '../type/quiz.type';
import { QuizService } from '../service/quiz.service';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { GqlAuthGuard } from '../../user/auth-guard';

@Resolver('TaskType')
@UseGuards(GqlAuthGuard)
export class QuizResolver {
  constructor(private quizService: QuizService) {}

  // Create Quiz
  @Mutation(() => QuizType)
  createQuiz(@Args('createQuizDto') createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  // Retrieve all quizes
  @Query(() => [QuizType])
  getQuiz() {
    return this.quizService.getQuiz();
  }

  // Delete quiz 
    // @Mutation(() => QuizType)
    // deleteQuiz(@Args('id') id: number, @GetUser() user: Admin) {
    //   return this.quizService.deleteTask(id, user);
    // }
}
