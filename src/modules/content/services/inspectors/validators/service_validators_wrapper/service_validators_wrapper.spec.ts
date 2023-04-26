import { Test, TestingModule } from '@nestjs/testing';
import { ServiceValidatorsWrapper } from './service_validators_wrapper';

describe('ServiceValidatorsWrapper', () => {
  let provider: ServiceValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceValidatorsWrapper],
    }).compile();

    provider = module.get<ServiceValidatorsWrapper>(ServiceValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
