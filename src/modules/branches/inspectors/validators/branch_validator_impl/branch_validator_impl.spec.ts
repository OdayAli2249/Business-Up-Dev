import { Test, TestingModule } from '@nestjs/testing';
import { BranchValidatorImpl } from './branch_validator_impl';

describe('BranchValidatorImpl', () => {
  let provider: BranchValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchValidatorImpl],
    }).compile();

    provider = module.get<BranchValidatorImpl>(BranchValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
