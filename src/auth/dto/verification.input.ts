import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class VerificationInput {
  @Field(() => String)
  @IsEmail()
  email: string;
}
