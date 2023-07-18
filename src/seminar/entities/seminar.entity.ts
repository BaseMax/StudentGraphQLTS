import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Form } from './form.entity';
import { Student } from '../../student/entities/student.entity';

@ObjectType()
export class Seminar {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  listOfArticles: string;

  @Field(() => Int)
  progress: number;

  @Field(() => [Form])
  forms: Form[];

  @Field(() => Student)
  User: Student;
}
