import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { QuizType } from '../type/quiz.type';
import { QuizService } from '../service/quiz.service';
import { CreateQuizDto } from '../dto/create-quiz.dto';
// import { TaskStatus } from './Entities/task-status.enum';
import { Admin } from 'src/user/entities/admin.entities';
import { GetUser } from 'src/user/get-user.decorator';
import { GqlAuthGuard } from 'src/user/auth-guard';

@Resolver('TaskType')
@UseGuards(GqlAuthGuard)
export class QuizResolver {
  constructor(private quizService: QuizService) {}

  // Create New Task
  @Mutation(() => QuizType)
  createQuiz(
    @Args('createQuizDto') createQuizDto: CreateQuizDto,
    @GetUser() user: Admin,
  ) {
    return this.quizService.createQuiz(createQuizDto, user);
  }

  // Retrieve all user Tasks
  @Query(() => [QuizType])
  getQuiz(@GetUser() user: Admin) {
    console.log(user);
    return this.quizService.getQuiz(user);
  }

  // Update Task Status
  //   @Mutation(() => QuizType)
  //   updateTask(
  //     @Args('id') id: number,
  //     // @Args('status') status: TaskStatus,
  //     @GetUser() user: User,
  //   ) {
  //     return this.quizService.updateTaskStatus(id, status, user);
  //   }

  // Delete task by ID

  //   @Mutation(() => QuizType)
  //   deleteTask(@Args('id') id: number, @GetUser() user: Admin) {
  //     return this.quizService.deleteTask(id, user);
  //   }
}
