import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';
// import { Admin } from 'src/user/entities/admin.entities';
// import { ErrorCode } from 'src/common/exceptions';
import { QuizRepository } from './quiz.repository';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizRepository)
    private quizRepository: QuizRepository,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizRepository.createQuiz(createQuizDto);
  }

  getQuiz(): Promise<Quiz> {
    return this.quizRepository.findOne();
  }

  async getQuizById(id: number): Promise<Quiz> {
    return this.quizRepository.findOne({ where: { id } });
  }

  // getQuiz(): Promise<Quiz[]> {
  //   return this.quizRepository.getQuiz();
  // }

  //   async deleteQuiz(id: number, user: Admin): Promise<void> {
  //     const result = await this.quizRepository.delete({ id, userId: user.id });
  //     if (result.affected === 0)
  //       throw new NotFoundException(ErrorCode.TASK_NOT_PRESENT);
  //   }

  async updateQuizName(id: number, name: string): Promise<Quiz> {
    const quiz = await this.getQuizById(id);
    // if (!quiz) {
    //   throw new NotFoundException(
    //     'No Quiz for this Id',
    //     ErrorCode.TASK_NOT_PRESENT,
    //   );
    // }
    quiz.title = name;
    quiz.save();
    return quiz;
  }
}
