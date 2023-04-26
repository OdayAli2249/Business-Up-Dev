import { Test, TestingModule } from '@nestjs/testing';
import { ProductValidatorImpl } from './product_validator_impl';

describe('ProductValidatorImpl', () => {
  let provider: ProductValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductValidatorImpl],
    }).compile();

    provider = module.get<ProductValidatorImpl>(ProductValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
