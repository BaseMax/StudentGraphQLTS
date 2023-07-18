import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddFormInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => String, { nullable: true })
  file?: string;
}
