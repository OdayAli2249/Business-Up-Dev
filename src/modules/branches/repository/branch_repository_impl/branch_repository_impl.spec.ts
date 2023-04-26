import { Test, TestingModule } from '@nestjs/testing';
import { BranchRepositoryImpl } from './branch_repository_impl';

describe('BranchRepositoryImpl', () => {
  let provider: BranchRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchRepositoryImpl],
    }).compile();

    provider = module.get<BranchRepositoryImpl>(BranchRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
