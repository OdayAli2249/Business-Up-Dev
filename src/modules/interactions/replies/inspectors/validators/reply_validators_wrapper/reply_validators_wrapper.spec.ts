import { Test, TestingModule } from '@nestjs/testing';
import { ReplyValidatorsWrapper } from './reply_validators_wrapper';

describe('ReplyValidatorsWrapper', () => {
  let provider: ReplyValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplyValidatorsWrapper],
    }).compile();

    provider = module.get<ReplyValidatorsWrapper>(ReplyValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
