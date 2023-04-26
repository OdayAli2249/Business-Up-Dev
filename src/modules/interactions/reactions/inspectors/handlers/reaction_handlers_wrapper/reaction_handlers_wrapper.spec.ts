import { Test, TestingModule } from '@nestjs/testing';
import { ReactionHandlersWrapper } from './reaction_handlers_wrapper';

describe('ReactionHandlersWrapper', () => {
  let provider: ReactionHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactionHandlersWrapper],
    }).compile();

    provider = module.get<ReactionHandlersWrapper>(ReactionHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
