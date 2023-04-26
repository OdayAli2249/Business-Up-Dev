import { Test, TestingModule } from '@nestjs/testing';
import { BranchDataSourceImpl } from './branch_data_source_impl';

describe('BranchDataSourceImpl', () => {
  let provider: BranchDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchDataSourceImpl],
    }).compile();

    provider = module.get<BranchDataSourceImpl>(BranchDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
