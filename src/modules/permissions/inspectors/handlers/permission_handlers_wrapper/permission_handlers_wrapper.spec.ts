import { Test, TestingModule } from '@nestjs/testing';
import { PermissionHandlersWrapper } from './permission_handlers_wrapper';

describe('PermissionHandlersWrapper', () => {
  let provider: PermissionHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionHandlersWrapper],
    }).compile();

    provider = module.get<PermissionHandlersWrapper>(PermissionHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
