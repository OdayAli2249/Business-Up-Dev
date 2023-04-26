import { Test, TestingModule } from '@nestjs/testing';
import { CommentValidatorsWrapper } from './comment_validators_wrapper';

describe('CommentValidatorsWrapper', () => {
  let provider: CommentValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentValidatorsWrapper],
    }).compile();

    provider = module.get<CommentValidatorsWrapper>(CommentValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
