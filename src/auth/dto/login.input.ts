import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String)
  nationalCode: string;

  @Field(() => String)
  password: string;
}
