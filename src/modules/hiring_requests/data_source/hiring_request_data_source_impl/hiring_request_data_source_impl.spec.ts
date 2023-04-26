import { Test, TestingModule } from '@nestjs/testing';
import { HiringRequestDataSourceImpl } from './hiring_request_data_source_impl';

describe('HiringRequestDataSourceImpl', () => {
  let provider: HiringRequestDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HiringRequestDataSourceImpl],
    }).compile();

    provider = module.get<HiringRequestDataSourceImpl>(HiringRequestDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
