import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Conversation } from './conversation.entity';

@ObjectType()
export class Message {
  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  file: string;

  @Field(() => Int)
  sender: number;

  @Field(() => Conversation)
  Conversation: Conversation;
}
