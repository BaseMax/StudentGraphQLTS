import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupervisorModule } from './supervisor/supervisor.module';
import { StudentModule } from './student/student.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [SupervisorModule, StudentModule, ConversationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
