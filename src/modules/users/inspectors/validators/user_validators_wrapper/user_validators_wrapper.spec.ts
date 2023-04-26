import { Test, TestingModule } from '@nestjs/testing';
import { UserValidatorsWrapper } from './user_validators_wrapper';

describe('UserValidatorsWrapper', () => {
  let provider: UserValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserValidatorsWrapper],
    }).compile();

    provider = module.get<UserValidatorsWrapper>(UserValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
