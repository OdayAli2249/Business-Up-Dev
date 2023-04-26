import { Test, TestingModule } from '@nestjs/testing';
import { SubscribtionDataSourceImpl } from './subscribtion_data_source_impl';

describe('SubscribtionDataSourceImpl', () => {
  let provider: SubscribtionDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribtionDataSourceImpl],
    }).compile();

    provider = module.get<SubscribtionDataSourceImpl>(SubscribtionDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
