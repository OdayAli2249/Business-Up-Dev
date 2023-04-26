import { Test, TestingModule } from '@nestjs/testing';
import { PostHandlersWrapper } from './post_handlers_wrapper';

describe('PostHandlersWrapper', () => {
  let provider: PostHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostHandlersWrapper],
    }).compile();

    provider = module.get<PostHandlersWrapper>(PostHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
