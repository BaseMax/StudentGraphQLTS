import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  nationalCode: string;
}
