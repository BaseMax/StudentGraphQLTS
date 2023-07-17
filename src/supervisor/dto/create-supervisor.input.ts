import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSupervisorInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  googleScholar: string;
}
