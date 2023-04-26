import { Test, TestingModule } from '@nestjs/testing';
import { HiringRequestRepositoryImpl } from './hiring_request_repository_impl';

describe('HiringRequestRepositoryImpl', () => {
  let provider: HiringRequestRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HiringRequestRepositoryImpl],
    }).compile();

    provider = module.get<HiringRequestRepositoryImpl>(HiringRequestRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
