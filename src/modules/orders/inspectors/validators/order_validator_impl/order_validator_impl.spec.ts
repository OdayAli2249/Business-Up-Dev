import { Test, TestingModule } from '@nestjs/testing';
import { OrderValidatorImpl } from './order_validator_impl';

describe('OrderValidatorImpl', () => {
  let provider: OrderValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderValidatorImpl],
    }).compile();

    provider = module.get<OrderValidatorImpl>(OrderValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
