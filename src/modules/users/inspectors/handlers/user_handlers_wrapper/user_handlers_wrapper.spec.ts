import { Test, TestingModule } from '@nestjs/testing';
import { UserHandlersWrapper } from './user_handlers_wrapper';

describe('UserHandlersWrapper', () => {
  let provider: UserHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHandlersWrapper],
    }).compile();

    provider = module.get<UserHandlersWrapper>(UserHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
