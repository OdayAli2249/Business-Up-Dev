import { Test, TestingModule } from '@nestjs/testing';
import { ReactionValidatorImpl } from './reaction_validator_impl';

describe('ReactionValidatorImpl', () => {
  let provider: ReactionValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactionValidatorImpl],
    }).compile();

    provider = module.get<ReactionValidatorImpl>(ReactionValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
