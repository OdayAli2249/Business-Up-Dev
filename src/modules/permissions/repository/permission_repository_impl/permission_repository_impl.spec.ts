import { Test, TestingModule } from '@nestjs/testing';
import { PermissionRepositoryImpl } from './permission_repository_impl';

describe('PermissionRepositoryImpl', () => {
  let provider: PermissionRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionRepositoryImpl],
    }).compile();

    provider = module.get<PermissionRepositoryImpl>(PermissionRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
