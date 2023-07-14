import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Supervisor {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
