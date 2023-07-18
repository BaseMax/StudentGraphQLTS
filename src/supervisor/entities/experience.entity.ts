import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Educational {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  level: string;

  @Field(() => String)
  university: string;
}
