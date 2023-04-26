import { Test, TestingModule } from '@nestjs/testing';
import { PostValidatorsWrapper } from './post_validators_wrapper';

describe('PostValidatorsWrapper', () => {
  let provider: PostValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostValidatorsWrapper],
    }).compile();

    provider = module.get<PostValidatorsWrapper>(PostValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
