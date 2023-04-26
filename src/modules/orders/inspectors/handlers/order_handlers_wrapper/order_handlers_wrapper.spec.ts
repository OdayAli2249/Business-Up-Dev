import { Test, TestingModule } from '@nestjs/testing';
import { OrderHandlersWrapper } from './order_handlers_wrapper';

describe('OrderHandlersWrapper', () => {
  let provider: OrderHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderHandlersWrapper],
    }).compile();

    provider = module.get<OrderHandlersWrapper>(OrderHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
