import { Test, TestingModule } from '@nestjs/testing';
import { OrderValidatorsWrapper } from './order_validators_wrapper';

describe('OrderValidatorsWrapper', () => {
  let provider: OrderValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderValidatorsWrapper],
    }).compile();

    provider = module.get<OrderValidatorsWrapper>(OrderValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
