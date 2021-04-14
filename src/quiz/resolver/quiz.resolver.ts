import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { QuizType } from '../type/quiz.type';
import { QuizService } from '../service/quiz.service';
import { CreateQuizDto } from '../dto/create-quiz.dto';
// import { Admin } from 'src/user/entities/admin.entities';
// import { GetUser } from 'src/user/get-user.decorator';
import { GqlAuthGuard } from 'src/user/auth-guard';

@Resolver('TaskType')
@UseGuards(GqlAuthGuard)
export class QuizResolver {
  constructor(private quizService: QuizService) {}

  // Create New Task
  @Mutation(() => QuizType)
  createQuiz(@Args('createQuizDto') createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  // Retrieve all user Tasks
  @Query(() => [QuizType])
  getQuiz() {
    return this.quizService.getQuiz();
  }

  // Update quiz name
  @Mutation(() => QuizType)
  updateQuiz(
    @Args('id') id: number,
    @Args('name') name: string,
    // @GetUser() user: User,
  ) {
    return this.quizService.updateQuizName(id, name);
  }

  // Delete task by ID
  //   @Mutation(() => QuizType)
  //   deleteTask(@Args('id') id: number, @GetUser() user: Admin) {
  //     return this.quizService.deleteTask(id, user);
  //   }
}
