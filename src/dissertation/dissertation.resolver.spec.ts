import { Test, TestingModule } from '@nestjs/testing';
import { DissertationResolver } from './dissertation.resolver';
import { DissertationService } from './dissertation.service';

describe('DissertationResolver', () => {
  let resolver: DissertationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DissertationResolver, DissertationService],
    }).compile();

    resolver = module.get<DissertationResolver>(DissertationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
