import { Test, TestingModule } from '@nestjs/testing';
import { SeminarService } from './seminar.service';

describe('SeminarService', () => {
  let service: SeminarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeminarService],
    }).compile();

    service = module.get<SeminarService>(SeminarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
