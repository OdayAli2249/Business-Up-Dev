import { Test, TestingModule } from '@nestjs/testing';
import { ServiceValidatorImpl } from './service_validator_impl';

describe('ServiceValidatorImpl', () => {
  let provider: ServiceValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceValidatorImpl],
    }).compile();

    provider = module.get<ServiceValidatorImpl>(ServiceValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
