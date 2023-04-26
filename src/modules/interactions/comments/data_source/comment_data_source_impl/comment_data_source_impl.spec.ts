import { Test, TestingModule } from '@nestjs/testing';
import { CommentDataSourceImpl } from './comment_data_source_impl';

describe('CommentDataSourceImpl', () => {
  let provider: CommentDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentDataSourceImpl],
    }).compile();

    provider = module.get<CommentDataSourceImpl>(CommentDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
