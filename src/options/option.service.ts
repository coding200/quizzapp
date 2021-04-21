import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOptionDto } from './dto/option.dto';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optRepository: Repository<Option>,
  ) {}

  async createOpt(createOptionDto: CreateOptionDto): Promise<Option> {
    return this.optRepository.save(createOptionDto);
  }

  async getOpt(id: number): Promise<Option[]> {
    return this.optRepository.find({ where: { ques_id: id } });
  }

  async getOptById(id: number): Promise<Option> {
    return this.optRepository.findOne({ where: { id } });
  }

  async updateOptStatus(id: number, status: boolean): Promise<Option> {
    const opt = await this.getOptById(id);
    if (!opt) {
      throw new NotFoundException('No Option for this Id');
    }
    opt.is_active = status;
    return this.optRepository.save(opt);
  }
}
