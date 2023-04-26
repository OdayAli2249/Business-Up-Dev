import { Test, TestingModule } from '@nestjs/testing';
import { ReplyDataSourceImpl } from './reply_data_source_impl';

describe('ReplyDataSourceImpl', () => {
  let provider: ReplyDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplyDataSourceImpl],
    }).compile();

    provider = module.get<ReplyDataSourceImpl>(ReplyDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
