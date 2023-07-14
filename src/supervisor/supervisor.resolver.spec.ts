import { Test, TestingModule } from '@nestjs/testing';
import { SupervisorResolver } from './supervisor.resolver';
import { SupervisorService } from './supervisor.service';

describe('SupervisorResolver', () => {
  let resolver: SupervisorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupervisorResolver, SupervisorService],
    }).compile();

    resolver = module.get<SupervisorResolver>(SupervisorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
