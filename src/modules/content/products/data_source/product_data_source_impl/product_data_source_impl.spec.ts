import { Test, TestingModule } from '@nestjs/testing';
import { ProductDataSourceImpl } from './product_data_source_impl';

describe('ProductDataSourceImpl', () => {
  let provider: ProductDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductDataSourceImpl],
    }).compile();

    provider = module.get<ProductDataSourceImpl>(ProductDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
