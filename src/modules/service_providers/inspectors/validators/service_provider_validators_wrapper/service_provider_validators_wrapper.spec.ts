import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProviderValidatorsWrapper } from './service_provider_validators_wrapper';

describe('ServiceProviderValidatorsWrapper', () => {
  let provider: ServiceProviderValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceProviderValidatorsWrapper],
    }).compile();

    provider = module.get<ServiceProviderValidatorsWrapper>(ServiceProviderValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
