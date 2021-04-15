import { Module } from '@nestjs/common';
import { AnswersResolver } from './resolver/answers.resolver';
import { AnswersService } from './service/answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerRepository } from './service/answers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerRepository])],
  providers: [AnswersResolver, AnswersService],
})
export class AnswersModule {}
