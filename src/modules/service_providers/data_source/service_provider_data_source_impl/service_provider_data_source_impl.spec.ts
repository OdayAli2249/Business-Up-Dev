import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProviderDataSourceImpl } from './service_provider_data_source_impl';

describe('ServiceProviderDataSourceImpl', () => {
  let provider: ServiceProviderDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceProviderDataSourceImpl],
    }).compile();

    provider = module.get<ServiceProviderDataSourceImpl>(ServiceProviderDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
