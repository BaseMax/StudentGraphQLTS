import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Conversation } from './conversation.entity';
import { Sender } from '@prisma/client';

@ObjectType()
export class Message {
  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  file: string;

  @Field(() => Sender)
  sender: Sender;

  @Field(() => Conversation)
  Conversation: Conversation;
}

registerEnumType(Sender, {
  name: 'Sender',
});
