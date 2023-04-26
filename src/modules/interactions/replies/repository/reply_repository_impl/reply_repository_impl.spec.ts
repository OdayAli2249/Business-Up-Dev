import { Test, TestingModule } from '@nestjs/testing';
import { ReplyRepositoryImpl } from './reply_repository_impl';

describe('ReplyRepositoryImpl', () => {
  let provider: ReplyRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplyRepositoryImpl],
    }).compile();

    provider = module.get<ReplyRepositoryImpl>(ReplyRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
