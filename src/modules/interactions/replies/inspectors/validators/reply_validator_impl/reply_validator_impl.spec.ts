import { Test, TestingModule } from '@nestjs/testing';
import { ReplyValidatorImpl } from './reply_validator_impl';

describe('ReplyValidatorImpl', () => {
  let provider: ReplyValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplyValidatorImpl],
    }).compile();

    provider = module.get<ReplyValidatorImpl>(ReplyValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
