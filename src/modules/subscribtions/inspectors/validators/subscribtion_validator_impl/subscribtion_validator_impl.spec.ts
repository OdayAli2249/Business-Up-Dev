import { Test, TestingModule } from '@nestjs/testing';
import { SubscribtionValidatorImpl } from './subscribtion_validator_impl';

describe('SubscribtionValidatorImpl', () => {
  let provider: SubscribtionValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribtionValidatorImpl],
    }).compile();

    provider = module.get<SubscribtionValidatorImpl>(SubscribtionValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
