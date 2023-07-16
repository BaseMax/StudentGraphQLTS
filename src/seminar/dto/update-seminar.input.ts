import { CreateSeminarInput } from './create-seminar.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSeminarInput extends PartialType(CreateSeminarInput) {
  @Field(() => Int)
  id: number;
}
