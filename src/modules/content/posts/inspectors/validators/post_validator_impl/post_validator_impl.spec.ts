import { Test, TestingModule } from '@nestjs/testing';
import { PostValidatorImpl } from './post_validator_impl';

describe('PostValidatorImpl', () => {
  let provider: PostValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostValidatorImpl],
    }).compile();

    provider = module.get<PostValidatorImpl>(PostValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
