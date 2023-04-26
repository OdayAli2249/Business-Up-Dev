import { Test, TestingModule } from '@nestjs/testing';
import { CommentValidatorImpl } from './comment_validator_impl';

describe('CommentValidatorImpl', () => {
  let provider: CommentValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentValidatorImpl],
    }).compile();

    provider = module.get<CommentValidatorImpl>(CommentValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
