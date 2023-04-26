import { Test, TestingModule } from '@nestjs/testing';
import { SubscribtionValidatorsWrapper } from './subscribtion_validators_wrapper';

describe('SubscribtionValidatorsWrapper', () => {
  let provider: SubscribtionValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribtionValidatorsWrapper],
    }).compile();

    provider = module.get<SubscribtionValidatorsWrapper>(SubscribtionValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
