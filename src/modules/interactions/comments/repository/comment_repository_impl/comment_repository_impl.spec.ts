import { Test, TestingModule } from '@nestjs/testing';
import { CommentRepositoryImpl } from './comment_repository_impl';

describe('CommentRepositoryImpl', () => {
  let provider: CommentRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentRepositoryImpl],
    }).compile();

    provider = module.get<CommentRepositoryImpl>(CommentRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
