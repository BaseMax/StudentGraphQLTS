import { Test, TestingModule } from '@nestjs/testing';
import { DissertationService } from './dissertation.service';

describe('DissertationService', () => {
  let service: DissertationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DissertationService],
    }).compile();

    service = module.get<DissertationService>(DissertationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
