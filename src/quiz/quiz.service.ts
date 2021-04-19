import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entities';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto, user: User): Promise<Quiz> {
    const quiz_present = await this.getQuizByName(createQuizDto.title);
    console.log(quiz_present);
    if (quiz_present) {
      throw new ConflictException('quiz already present');
    }
    return this.quizRepository.save({
      ...createQuizDto,
      created_by: user.id,
    });
  }

  getQuiz(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  async getQuizByName(title: string): Promise<Quiz> {
    console.log(title);
    return this.quizRepository.findOne({ where: { title } });
  }
}
