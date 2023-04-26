import { Test, TestingModule } from '@nestjs/testing';
import { ReactionValidatorsWrapper } from './reaction_validators_wrapper';

describe('ReactionValidatorsWrapper', () => {
  let provider: ReactionValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactionValidatorsWrapper],
    }).compile();

    provider = module.get<ReactionValidatorsWrapper>(ReactionValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
