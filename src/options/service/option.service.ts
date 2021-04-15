import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOptionDto } from '../dto/option.dto';
import { Option } from '../entities/option.entity';
import { OptionRepository } from './option.repository';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionRepository)
    private optRepository: OptionRepository,
  ) {}

  async createOpt(createOptionDto: CreateOptionDto): Promise<Option> {
    return this.optRepository.createOpt(createOptionDto);
  }

  async getOpt(id: number): Promise<Option[]> {
    return this.optRepository.find({ where: { ques_id: id } });
  }

  async getOptById(id: number): Promise<Option> {
    return this.optRepository.findOne({ where: { id } });
  }

  async updateOptStatus(id: number, status: boolean): Promise<Option> {
    const opt = await this.getOptById(id);
    // if (!ques) {
    //   throw new NotFoundException(
    //     'No Task for this Id',
    //     ErrorCode.TASK_NOT_PRESENT,
    //   );
    // }
    opt.is_active = status;
    opt.save();
    return opt;
  }
}
