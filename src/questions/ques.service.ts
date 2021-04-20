import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuesDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { QuesType } from './type/question-type';
import { User } from '../user/entities/user.entities';
import { UserRole } from '../user/entities/user-role.enum';
import { ErrorCode } from '../common/exceptions';

@Injectable()
export class QuesService {
  constructor(
    @InjectRepository(Question)
    private readonly quesRepository: Repository<Question>,
  ) {}

  async createQues(
    createQuesDto: CreateQuesDto,
    user: User,
  ): Promise<Question> {
    if (user.is_user) {
      throw new UnauthorizedException(
        'You are not authorized',
        ErrorCode.ACCESS_DENIED,
      );
    }
    return this.quesRepository.save({
      ...createQuesDto,
      created_by: user.id,
    });
  }

  getques(id: number): Promise<Question[]> {
    return this.quesRepository.find({ where: { quiz_id: id } });
  }

  async getQuesById(id: number): Promise<Question> {
    return this.quesRepository.findOne({ where: { id } });
  }

  async updateQuesStatus(id: number, status: boolean): Promise<QuesType> {
    const ques = await this.getQuesById(id);
    if (!ques) {
      throw new NotFoundException('ques with #${id} not found');
    }
    ques.is_active = status;
    return this.quesRepository.save(ques);
  }
}
