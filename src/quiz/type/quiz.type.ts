import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('Quiz')
export class QuizType {
  @Field()
  id: string;

  @Field()
  title: string;
}
