import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateConversationInput {
  @Field(() => Int)
  supervisorId: number;

  @Field(() => String)
  title: string;
}
