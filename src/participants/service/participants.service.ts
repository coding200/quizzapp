import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantRepository } from './participant.repository';
import { CreatePartDto } from '../dto/participants.dto';
import { Participant } from '../enitities/participants.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(ParticipantRepository)
    private partRepository: ParticipantRepository,
  ) {}

  async createPart(createPartDto: CreatePartDto): Promise<Participant> {
    return this.partRepository.createPart(createPartDto);
  }

  async getPart(): Promise<Participant[]> {
    return this.partRepository.find();
  }

  async getPartById(id: number): Promise<Participant> {
    return this.partRepository.findOne({ where: { user_id: id } });
  }
}
