import { CreateSupervisorInput } from './create-supervisor.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSupervisorInput extends PartialType(CreateSupervisorInput) {
  @Field(() => Int)
  id: number;
}
