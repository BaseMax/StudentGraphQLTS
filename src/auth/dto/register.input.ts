import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field(() => String)
  nationalCode: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Number)
  code: number;
}
