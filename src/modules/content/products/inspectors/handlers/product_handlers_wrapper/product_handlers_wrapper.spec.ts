import { Test, TestingModule } from '@nestjs/testing';
import { ProductHandlersWrapper } from './product_handlers_wrapper';

describe('ProductHandlersWrapper', () => {
  let provider: ProductHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductHandlersWrapper],
    }).compile();

    provider = module.get<ProductHandlersWrapper>(ProductHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
