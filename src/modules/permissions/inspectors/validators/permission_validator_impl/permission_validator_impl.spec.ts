import { Test, TestingModule } from '@nestjs/testing';
import { PermissionValidatorImpl } from './permission_validator_impl';

describe('PermissionValidatorImpl', () => {
  let provider: PermissionValidatorImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionValidatorImpl],
    }).compile();

    provider = module.get<PermissionValidatorImpl>(PermissionValidatorImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
