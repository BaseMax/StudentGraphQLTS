import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Seminar {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
