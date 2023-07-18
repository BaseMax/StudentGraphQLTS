import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSeminarInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => [String])
  listOfArticles: [string];

  @Field(() => Int, { nullable: true })
  progress?: number;
}
