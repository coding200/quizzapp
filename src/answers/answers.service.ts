import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answers.entity';
import { CreateAnsDto } from './dto/answers.dto';
import { Repository } from 'typeorm';
import { Option } from '../options/entities/option.entity';
import { User } from '../user/entities/user.entities';
import { ErrorCode } from '../common/exceptions';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private ansRepository: Repository<Answer>,
  ) {}

  async submitAns(createAnsDto: CreateAnsDto): Promise<Answer> {
    // const ans = await this.ansRepository
    //   .createQueryBuilder('A')
    //   .select('Option.is_correct')
    //   .leftJoinAndSelect('A.opt', 'Option')
    //   .getOne();
    // console.log(ans);
try{
  const ic: any = await this.ansRepository
      .createQueryBuilder()
      .select('op.is_correct')
      .from(Option, 'op')
      .innerJoinAndSelect(Answer, 'a', 'a.opt_id=op.id')
      .getOne();
      console.log(ic);
       return this.ansRepository.save({
         ...createAnsDto,
         // is_correct: ans.is_correct,
       });
}catch{
  throw new BadRequestException('check the option')
}
    // const ic: any = await this.ansRepository
    //   .createQueryBuilder()
    //   .select('op.is_correct')
    //   .from(Option, 'op')
    //   .innerJoinAndSelect(Answer, 'a', 'a.opt_id=op.id')
    //   .getOne();

    return this.ansRepository.save({
      ...createAnsDto,
      // is_correct: ans.is_correct,
    });
  }

  async getUserAns(id: number, user: User): Promise<Answer> {
    if (!user.is_user) {
      return this.ansRepository.findOne({ where: { part_id: id } });
    }
    throw new UnauthorizedException(
      'you are not authorized',
      ErrorCode.ACCESS_DENIED,
    );
  }
}
