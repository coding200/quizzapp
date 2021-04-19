import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answers.entity';
import { CreateAnsDto } from './dto/answers.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private ansRepository: Repository<Answer>,
  ) {}

  async submitAns(createAnsDto: CreateAnsDto): Promise<Answer> {
    return this.ansRepository.save(createAnsDto);
  }


  async getUserAns(id: number): Promise<Answer> {
    return this.ansRepository.findOne({ where: { part_id: id } });
  }
}
