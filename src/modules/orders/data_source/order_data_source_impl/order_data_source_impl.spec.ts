import { Test, TestingModule } from '@nestjs/testing';
import { OrderDataSourceImpl } from './order_data_source_impl';

describe('OrderDataSourceImpl', () => {
  let provider: OrderDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDataSourceImpl],
    }).compile();

    provider = module.get<OrderDataSourceImpl>(OrderDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
