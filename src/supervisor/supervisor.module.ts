import { Module } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { SupervisorResolver } from './supervisor.resolver';

@Module({
  providers: [SupervisorResolver, SupervisorService],
})
export class SupervisorModule {}
