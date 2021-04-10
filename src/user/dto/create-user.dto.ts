import {
  IsString,
  IsEmail,
  IsNotEmpty,
  minLength,
  length,
  Matches,
  Length,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDto {
  @Field()
  @IsString()
  first_name: string;

  @Field()
  @IsString()
  last_name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  // @Length(10, 12)
  phone: string;

  @Field()
  // @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  // @Length(4, 10)
  username: string;

  @Field()
  @IsString()
  // @IsNotEmpty()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;
}
