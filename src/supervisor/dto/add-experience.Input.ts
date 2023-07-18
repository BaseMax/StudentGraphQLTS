import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddEducationalInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  level: string;

  @Field(() => String)
  university: string;
}
