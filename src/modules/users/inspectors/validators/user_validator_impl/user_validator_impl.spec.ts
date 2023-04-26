import { Test, TestingModule } from '@nestjs/testing';
import { UserValidatorImpl } from './user_validator_impl';

describe('UserValidatorImpl', () => {
  let provider: UserValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserValidatorImpl],
    }).compile();

    provider = module.get<UserValidatorImpl>(UserValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
