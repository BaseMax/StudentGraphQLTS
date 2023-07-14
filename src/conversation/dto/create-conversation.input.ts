import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateConversationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
