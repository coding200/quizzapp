import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuesRepository } from './service/ques.repository';
import { QuesResolver } from './resolver/question.resolver';
import { QuesService } from './service/ques.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuesRepository])],
  providers: [QuesResolver, QuesService],
})
export class QuestionsModule {}
