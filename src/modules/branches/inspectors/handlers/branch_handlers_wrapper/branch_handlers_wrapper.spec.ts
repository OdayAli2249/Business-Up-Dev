import { Test, TestingModule } from '@nestjs/testing';
import { BranchHandlersWrapper } from './branch_handlers_wrapper';

describe('BranchHandlersWrapper', () => {
  let provider: BranchHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchHandlersWrapper],
    }).compile();

    provider = module.get<BranchHandlersWrapper>(BranchHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
