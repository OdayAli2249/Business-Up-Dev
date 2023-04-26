import { Test, TestingModule } from '@nestjs/testing';
import { HiringRequestValidatorsWrapper } from './hiring_request_validators_wrapper';

describe('HiringRequestValidatorsWrapper', () => {
  let provider: HiringRequestValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HiringRequestValidatorsWrapper],
    }).compile();

    provider = module.get<HiringRequestValidatorsWrapper>(HiringRequestValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
