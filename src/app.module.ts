import { Module } from '@nestjs/common';
import { SupervisorModule } from './supervisor/supervisor.module';
import { StudentModule } from './student/student.module';
import { ConversationModule } from './conversation/conversation.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { SeminarModule } from './seminar/seminar.module';
import { UploadModule } from './upload/upload.module';
import { DissertationModule } from './dissertation/dissertation.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    }),
    UploadModule,
    PrismaModule,
    MailModule,
    SupervisorModule,
    StudentModule,
    ConversationModule,
    AuthModule,
    SeminarModule,
    DissertationModule,
  ],
})
export class AppModule {}
