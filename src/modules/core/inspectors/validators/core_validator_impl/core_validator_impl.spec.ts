import { Test, TestingModule } from '@nestjs/testing';
import { CoreValidatorImpl } from './core_validator_impl';

describe('CoreValidatorImpl', () => {
  let provider: CoreValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreValidatorImpl],
    }).compile();

    provider = module.get<CoreValidatorImpl>(CoreValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
