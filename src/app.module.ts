import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { GraphQlOption } from './common/graphql.option';
import { UserModule } from './user/user.module';
// import { HasuraModule } from '@golevelup/nestjs-hasura';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRootAsync({
      useClass: GraphQlOption,
    }),
    UserModule,
    QuizModule,
  ],
})
export class AppModule {}

// @Module({
//   imports: [
//     HasuraModule.forRoot(HasuraModule, {
//       secretFactory: secret,
//       secretHeader: secretHeader,
//       // controllerPrefix: 'something', // this is optional. defaults to hasura
//     }),
//   ],
// })
