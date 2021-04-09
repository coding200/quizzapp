import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AdminDto {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  password: string;
}
