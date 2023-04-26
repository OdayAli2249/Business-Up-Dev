import { Test, TestingModule } from '@nestjs/testing';
import { ServiceDataSourceImpl } from './service_data_source_impl';

describe('ServiceDataSourceImpl', () => {
  let provider: ServiceDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceDataSourceImpl],
    }).compile();

    provider = module.get<ServiceDataSourceImpl>(ServiceDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
