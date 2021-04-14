import { Module } from '@nestjs/common';
import { ParticipantsService } from './service/participants.service';
import { ParticipantsResolver } from './resolver/participants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantRepository } from './service/participant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantRepository])],
  providers: [ParticipantsService, ParticipantsResolver],
})
export class ParticipantsModule {}
