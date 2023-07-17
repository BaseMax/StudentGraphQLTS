import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CompleteProfileInput {
  @Field(() => String)
  fatherName: string;

  @Field(() => Boolean)
  marital: boolean;

  @Field(() => Date)
  BirthDay: Date;

  @Field(() => String)
  address: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  fieldOfStudy: string;

  @Field(() => String)
  orientation: string;

  @Field(() => Int)
  enteringYear: number;

  @Field(() => String)
  beforeUniversity: string;

  @Field(() => String)
  dissertationTopic: string;

  @Field(() => Int)
  numberOfArticls: number;

  @Field(() => String, { nullable: true })
  seminarTopic?: string;
}
