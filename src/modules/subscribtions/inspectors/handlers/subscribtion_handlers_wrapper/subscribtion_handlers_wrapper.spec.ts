import { Test, TestingModule } from '@nestjs/testing';
import { SubscribtionHandlersWrapper } from './subscribtion_handlers_wrapper';

describe('SubscribtionHandlersWrapper', () => {
  let provider: SubscribtionHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribtionHandlersWrapper],
    }).compile();

    provider = module.get<SubscribtionHandlersWrapper>(SubscribtionHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
