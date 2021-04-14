import { EntityRepository, Repository } from 'typeorm';
import { Answer } from '../entities/answers.entity';
import { CreateAnsDto } from '../dto/answers.dto';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  async createAns(createAnsDto: CreateAnsDto): Promise<Answer> {
    const { ques_id, opt_id, part_id } = createAnsDto;
    const ans = new Answer();
    ans.ques_id = ques_id;
    ans.opt_id = opt_id;
    ans.part_id = part_id;

    //Right answer logic
    // ans.is_correct = is_correct;
    await ans.save();

    return ans;
  }
}
