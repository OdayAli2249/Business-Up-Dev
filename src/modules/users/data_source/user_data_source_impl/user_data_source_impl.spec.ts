import { Test, TestingModule } from '@nestjs/testing';
import { UserDataSourceImpl } from './user_data_source_impl';

describe('UserDataSourceImpl', () => {
  let provider: UserDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDataSourceImpl],
    }).compile();

    provider = module.get<UserDataSourceImpl>(UserDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
