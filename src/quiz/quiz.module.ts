import { Module } from '@nestjs/common';
import { QuizResolver } from './resolver/quiz.resolver';
import { QuizService } from './service/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizRepository } from './service/quiz.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuizRepository]), UserModule],
  providers: [QuizResolver, QuizService],
})
export class QuizModule {}
