import { Test, TestingModule } from '@nestjs/testing';
import { ReactionDataSourceImpl } from './reaction_data_source_impl';

describe('ReactionDataSourceImpl', () => {
  let provider: ReactionDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactionDataSourceImpl],
    }).compile();

    provider = module.get<ReactionDataSourceImpl>(ReactionDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
