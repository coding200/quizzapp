import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PartType } from '../type/participants.type';
import { CreatePartDto } from '../dto/participants.dto';
import { ParticipantsService } from '../service/participants.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/auth-guard';

@Resolver(PartType)
@UseGuards(GqlAuthGuard)
export class ParticipantsResolver {
  constructor(private partService: ParticipantsService) {}
  @Mutation(() => PartType)
  createPart(@Args('createPartDto') createPartDto: CreatePartDto) {
    return this.partService.createPart(createPartDto);
  }

  @Query(() => [PartType])
  getPart() {
    return this.partService.getPart();
  }

  @Query(() => PartType)
  getPartById(id: number) {
    return this.partService.getPartById(id);
  }
}
