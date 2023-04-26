import { Test, TestingModule } from '@nestjs/testing';
import { CommentHandlersWrapper } from './comment_handlers_wrapper';

describe('CommentHandlersWrapper', () => {
  let provider: CommentHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentHandlersWrapper],
    }).compile();

    provider = module.get<CommentHandlersWrapper>(CommentHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
