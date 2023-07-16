import { Test, TestingModule } from '@nestjs/testing';
import { SeminarResolver } from './seminar.resolver';
import { SeminarService } from './seminar.service';

describe('SeminarResolver', () => {
  let resolver: SeminarResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeminarResolver, SeminarService],
    }).compile();

    resolver = module.get<SeminarResolver>(SeminarResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
