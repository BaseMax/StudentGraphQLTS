import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDissertationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
