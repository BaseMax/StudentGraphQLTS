import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Message } from './message.entity';
import { Student } from '../../student/entities/student.entity';
import { Supervisor } from '../../supervisor/entities/supervisor.entity';
import { ConversationStatus } from '@prisma/client';

@ObjectType()
export class Conversation {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => ConversationStatus)
  status: ConversationStatus;

  @Field(() => [Message], { nullable: true })
  messages: [Message];

  @Field(() => Student, { name: 'student', nullable: true })
  user: Student;

  @Field(() => Supervisor, { nullable: true })
  supervisor: Supervisor;
}

registerEnumType(ConversationStatus, {
  name: 'ConversationStatus',
});
