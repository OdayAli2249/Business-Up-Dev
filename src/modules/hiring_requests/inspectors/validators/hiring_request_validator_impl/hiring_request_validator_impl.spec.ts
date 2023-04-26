import { Test, TestingModule } from '@nestjs/testing';
import { HiringRequestValidatorImpl } from './hiring_request_validator_impl';

describe('HiringRequestValidatorImpl', () => {
  let provider: HiringRequestValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HiringRequestValidatorImpl],
    }).compile();

    provider = module.get<HiringRequestValidatorImpl>(HiringRequestValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
