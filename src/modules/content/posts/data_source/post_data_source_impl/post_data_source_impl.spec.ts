import { Test, TestingModule } from '@nestjs/testing';
import { PostDataSourceImpl } from './post_data_source_impl';

describe('PostDataSourceImpl', () => {
  let provider: PostDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostDataSourceImpl],
    }).compile();

    provider = module.get<PostDataSourceImpl>(PostDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
