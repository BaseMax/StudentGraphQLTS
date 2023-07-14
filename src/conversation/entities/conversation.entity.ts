import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Conversation {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
