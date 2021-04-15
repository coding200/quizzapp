import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '../entities/answers.entity';
import { CreateAnsDto } from '../dto/answers.dto';
import { AnswerRepository } from './answers.repository';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerRepository)
    private ansRepository: AnswerRepository,
  ) {}

  async submitAns(createAnsDto: CreateAnsDto): Promise<Answer> {
    return this.ansRepository.createAns(createAnsDto);
  }

  async getAns(): Promise<Answer[]> {
    return this.ansRepository.find();
  }

  async getUserAns(id: number): Promise<Answer> {
    return this.ansRepository.findOne({ where: { part_id: id } });
  }
}
