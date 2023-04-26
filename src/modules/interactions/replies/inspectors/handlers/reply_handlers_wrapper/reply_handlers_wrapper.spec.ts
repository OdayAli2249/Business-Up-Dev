import { Test, TestingModule } from '@nestjs/testing';
import { ReplyHandlersWrapper } from './reply_handlers_wrapper';

describe('ReplyHandlersWrapper', () => {
  let provider: ReplyHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplyHandlersWrapper],
    }).compile();

    provider = module.get<ReplyHandlersWrapper>(ReplyHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
