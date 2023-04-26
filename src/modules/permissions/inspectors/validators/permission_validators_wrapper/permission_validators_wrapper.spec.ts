import { Test, TestingModule } from '@nestjs/testing';
import { PermissionValidatorsWrapper } from './permission_validators_wrapper';

describe('PermissionValidatorsWrapper', () => {
  let provider: PermissionValidatorsWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionValidatorsWrapper],
    }).compile();

    provider = module.get<PermissionValidatorsWrapper>(PermissionValidatorsWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
