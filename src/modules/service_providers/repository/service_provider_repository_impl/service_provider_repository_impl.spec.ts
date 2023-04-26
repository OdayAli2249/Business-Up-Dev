import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProviderRepositoryImpl } from './service_provider_repository_impl';

describe('ServiceProviderRepositoryImpl', () => {
  let provider: ServiceProviderRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceProviderRepositoryImpl],
    }).compile();

    provider = module.get<ServiceProviderRepositoryImpl>(ServiceProviderRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
