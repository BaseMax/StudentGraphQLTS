import { CreateDissertationInput } from './create-dissertation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDissertationInput extends PartialType(CreateDissertationInput) {
  @Field(() => Int)
  id: number;
}
