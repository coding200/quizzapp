import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { CreateQuesDto } from '../dto/create-question.dto';
import { QuesRepository } from './ques.repository';

@Injectable()
export class QuesService {
  constructor(
    @InjectRepository(QuesRepository)
    private quesRepository: QuesRepository,
  ) {}

  async createQues(createQuesDto: CreateQuesDto): Promise<Question> {
    return this.quesRepository.createQues(createQuesDto);
  }

  async getQues(): Promise<Question[]> {
    return this.quesRepository.find();
  }

  async getQuesById(id: number): Promise<Question> {
    return this.quesRepository.findOne({ where: { id } });
  }

  async updateQuesStatus(id: number, status: boolean): Promise<Question> {
    const ques = await this.getQuesById(id);
    // if (!ques) {
    //   throw new NotFoundException(
    //     'No Task for this Id',
    //     ErrorCode.TASK_NOT_PRESENT,
    //   );
    // }
    ques.is_active = status;
    ques.save();
    return ques;
  }
}
