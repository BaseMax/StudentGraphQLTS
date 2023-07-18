import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Student {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  nationalCode: string;
}
