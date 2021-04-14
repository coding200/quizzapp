import { Quiz } from '../entities/quiz.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateQuizDto } from '../dto/create-quiz.dto';
// import { TaskStatus } from '../Entities/task-status.enum';
// import { Admin } from 'src/user/entities/admin.entities';
// import { NotFoundException } from '@nestjs/common';
// import { ErrorCode } from 'src/common/exceptions';

@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {
  // async getQuiz(user: Admin): Promise<Quiz[]> {
  //   const query = this.createQueryBuilder('quiz');

  //   query.where('quiz.created_by = :created_by', { created_by: user.id });

  //   try {
  //     const quiz = await query.getMany();
  //     return quiz;
  //   } catch (error) {
  //     throw new NotFoundException(ErrorCode.TASK_NOT_PRESENT);
  //   }
  // }

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { title, created_by } = createQuizDto;
    const quiz = new Quiz();
    quiz.title = title;
    quiz.created_by = created_by;
    // quiz.user = user;

    await quiz.save();
    // delete quiz.user;
    return quiz;
  }
}
