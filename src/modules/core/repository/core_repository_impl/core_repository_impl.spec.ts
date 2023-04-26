import { Test, TestingModule } from '@nestjs/testing';
import { CoreRepositoryImpl } from './core_repository_impl';

describe('CoreRepositoryImpl', () => {
  let provider: CoreRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreRepositoryImpl],
    }).compile();

    provider = module.get<CoreRepositoryImpl>(CoreRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
