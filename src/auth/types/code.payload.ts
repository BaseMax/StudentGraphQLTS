import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CodePayload {
  @Field(() => Boolean)
  success: boolean;
}
