import { Test, TestingModule } from '@nestjs/testing';
import { HiringRequestHandlersWrapper } from './hiring_request_handlers_wrapper';

describe('HiringRequestHandlersWrapper', () => {
  let provider: HiringRequestHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HiringRequestHandlersWrapper],
    }).compile();

    provider = module.get<HiringRequestHandlersWrapper>(HiringRequestHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
