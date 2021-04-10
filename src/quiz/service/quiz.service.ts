import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { Admin } from 'src/user/entities/admin.entities';
import { ErrorCode } from 'src/common/exceptions';
import { QuizRepository } from './quiz.repository';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizRepository)
    private quizRepository: QuizRepository,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto, user: Admin): Promise<Quiz> {
    return this.quizRepository.createQuiz(createQuizDto, user);
  }

  getQuiz(user: Admin): Promise<Quiz[]> {
    return this.quizRepository.getQuiz(user);
  }

  //   async deleteQuiz(id: number, user: Admin): Promise<void> {
  //     const result = await this.quizRepository.delete({ id, userId: user.id });
  //     if (result.affected === 0)
  //       throw new NotFoundException(ErrorCode.TASK_NOT_PRESENT);
  //   }
}
