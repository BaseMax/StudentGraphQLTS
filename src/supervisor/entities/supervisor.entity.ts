import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Educational } from './experience.entity';
import { Student } from '../../student/entities/student.entity';
import { Conversation } from '../../conversation/entities/conversation.entity';

@ObjectType()
export class Supervisor {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  googleScholar: string;

  @Field(() => [Educational])
  educational: [Educational];

  @Field(() => [Student])
  students: [Student];

  @Field(() => [Conversation])
  Conversation: [Conversation];
}
