import { CreateConversationInput } from './create-conversation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateConversationInput extends PartialType(CreateConversationInput) {
  @Field(() => Int)
  id: number;
}
