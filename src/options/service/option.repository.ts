import { EntityRepository, Repository } from 'typeorm';
import { Option } from '../entities/option.entity';
import { CreateOptionDto } from '../dto/option.dto';

@EntityRepository(Option)
export class OptionRepository extends Repository<Option> {
  async createOpt(createOptionDto: CreateOptionDto): Promise<Option> {
    const { opt_text, ques_id, is_correct } = createOptionDto;
    const opt = new Option();
    opt.opt_text = opt_text;
    opt.ques_id = ques_id;
    opt.is_correct = is_correct;
    await opt.save();

    return opt;
  }
}
