import { Test, TestingModule } from '@nestjs/testing';
import { BranchValidatorsWrapper } from './branch_validators_wrapper';

describe('BranchValidatorsWrapper', () => {
  let provider: BranchValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchValidatorsWrapper],
    }).compile();

    provider = module.get<BranchValidatorsWrapper>(BranchValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
