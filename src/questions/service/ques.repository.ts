import { EntityRepository, Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { CreateQuesDto } from '../dto/create-question.dto';

@EntityRepository(Question)
export class QuesRepository extends Repository<Question> {
  async createQues(creatQuesDto: CreateQuesDto): Promise<Question> {
    const { ques_text, quiz_id, admin_id } = creatQuesDto;
    const ques = new Question();
    ques.ques_text = ques_text;
    ques.quiz_id = quiz_id;
    ques.admin_id = admin_id;

    // task.user = user;

    await ques.save();
    // delete task.user;
    return ques;
  }
}
