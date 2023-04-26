import { Test, TestingModule } from '@nestjs/testing';
import { ReactionRepositoryImpl } from './reaction_repository_impl';

describe('ReactionRepositoryImpl', () => {
  let provider: ReactionRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactionRepositoryImpl],
    }).compile();

    provider = module.get<ReactionRepositoryImpl>(ReactionRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
