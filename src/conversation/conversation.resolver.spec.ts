import { Test, TestingModule } from '@nestjs/testing';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from './conversation.service';

describe('ConversationResolver', () => {
  let resolver: ConversationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationResolver, ConversationService],
    }).compile();

    resolver = module.get<ConversationResolver>(ConversationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
