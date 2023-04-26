import { Test, TestingModule } from '@nestjs/testing';
import { ProductValidatorsWrapper } from './product_validators_wrapper';

describe('ProductValidatorsWrapper', () => {
  let provider: ProductValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductValidatorsWrapper],
    }).compile();

    provider = module.get<ProductValidatorsWrapper>(ProductValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
