import { Module } from '@nestjs/common';
import { DissertationService } from './dissertation.service';
import { DissertationResolver } from './dissertation.resolver';

@Module({
  providers: [DissertationResolver, DissertationService]
})
export class DissertationModule {}
