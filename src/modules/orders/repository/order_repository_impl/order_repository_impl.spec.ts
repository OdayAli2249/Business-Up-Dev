import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepositoryImpl } from './order_repository_impl';

describe('OrderRepositoryImpl', () => {
  let provider: OrderRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderRepositoryImpl],
    }).compile();

    provider = module.get<OrderRepositoryImpl>(OrderRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
