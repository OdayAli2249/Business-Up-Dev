import { Test, TestingModule } from '@nestjs/testing';
import { CoreDataSourceImpl } from './core_data_source_impl';

describe('CoreDataSourceImpl', () => {
  let provider: CoreDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreDataSourceImpl],
    }).compile();

    provider = module.get<CoreDataSourceImpl>(CoreDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
