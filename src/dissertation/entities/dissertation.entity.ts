import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Dissertation {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
