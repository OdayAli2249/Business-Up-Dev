import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProviderHandlersWrapper } from './service_provider_handlers_wrapper';

describe('ServiceProviderHandlersWrapper', () => {
  let provider: ServiceProviderHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceProviderHandlersWrapper],
    }).compile();

    provider = module.get<ServiceProviderHandlersWrapper>(ServiceProviderHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
