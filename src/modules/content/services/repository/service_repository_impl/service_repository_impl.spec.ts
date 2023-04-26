import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRepositoryImpl } from './service_repository_impl';

describe('ServiceRepositoryImpl', () => {
  let provider: ServiceRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceRepositoryImpl],
    }).compile();

    provider = module.get<ServiceRepositoryImpl>(ServiceRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
