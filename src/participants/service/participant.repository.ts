import { EntityRepository, Repository } from 'typeorm';
import { Participant } from '../enitities/participants.entity';
import { CreatePartDto } from '../dto/participants.dto';

@EntityRepository(Participant)
export class ParticipantRepository extends Repository<Participant> {
  async createPart(createPartDto: CreatePartDto): Promise<Participant> {
    const { quiz_id, user_id } = createPartDto;
    const part = new Participant();
    part.quiz_id = quiz_id;
    part.user_id = user_id;

    await part.save();
    return part;
  }
}
