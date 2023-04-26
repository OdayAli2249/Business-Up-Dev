import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProviderValidatorImpl } from './service_provider_validator_impl';

describe('ServiceProviderValidatorImpl', () => {
  let provider: ServiceProviderValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceProviderValidatorImpl],
    }).compile();

    provider = module.get<ServiceProviderValidatorImpl>(ServiceProviderValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
