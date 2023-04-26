import { Test, TestingModule } from '@nestjs/testing';
import { SubscribtionRepositoryImpl } from './subscribtion_repository_impl';

describe('SubscribtionRepositoryImpl', () => {
  let provider: SubscribtionRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribtionRepositoryImpl],
    }).compile();

    provider = module.get<SubscribtionRepositoryImpl>(SubscribtionRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
