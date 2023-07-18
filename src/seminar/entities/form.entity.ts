import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Form {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;
}
