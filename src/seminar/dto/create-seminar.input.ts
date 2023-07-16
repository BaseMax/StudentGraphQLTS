import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSeminarInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
