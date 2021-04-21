import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PartType } from './type/participants.type';
import { CreatePartDto } from './dto/participants.dto';
import { ParticipantsService } from './participants.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/auth-guard';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/entities/user.entities';

@Resolver(PartType)
@UseGuards(GqlAuthGuard)
export class ParticipantsResolver {
  constructor(private partService: ParticipantsService) {}
  @Mutation(() => PartType)
  createParticipant(
    @Args('createPartDto') createPartDto: CreatePartDto,
    @GetUser() user: User,
  ) {
    return this.partService.createPart(createPartDto, user);
  }

  @Query(() => [PartType])
  getParticipant(@Args('quiz_id') quiz_id: number) {
    return this.partService.getPart(quiz_id);
  }

  @Query(() => PartType)
  getParticipantByUserId(@Args('id') id: number) {
    return this.partService.getPartById(id);
  }
}
