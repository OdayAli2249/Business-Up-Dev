import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepositoryImpl } from './product_repository_impl';

describe('ProductRepositoryImpl', () => {
  let provider: ProductRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRepositoryImpl],
    }).compile();

    provider = module.get<ProductRepositoryImpl>(ProductRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
