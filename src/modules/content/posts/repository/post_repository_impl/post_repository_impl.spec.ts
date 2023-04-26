import { Test, TestingModule } from '@nestjs/testing';
import { PostRepositoryImpl } from './post_repository_impl';

describe('PostRepositoryImpl', () => {
  let provider: PostRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostRepositoryImpl],
    }).compile();

    provider = module.get<PostRepositoryImpl>(PostRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
