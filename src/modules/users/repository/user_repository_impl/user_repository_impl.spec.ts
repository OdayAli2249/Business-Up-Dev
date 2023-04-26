import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryImpl } from './user_repository_impl';

describe('UserRepositoryImpl', () => {
  let provider: UserRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepositoryImpl],
    }).compile();

    provider = module.get<UserRepositoryImpl>(UserRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
