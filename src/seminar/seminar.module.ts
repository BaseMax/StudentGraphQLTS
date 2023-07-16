import { Module } from '@nestjs/common';
import { SeminarService } from './seminar.service';
import { SeminarResolver } from './seminar.resolver';

@Module({
  providers: [SeminarResolver, SeminarService],
})
export class SeminarModule {}
