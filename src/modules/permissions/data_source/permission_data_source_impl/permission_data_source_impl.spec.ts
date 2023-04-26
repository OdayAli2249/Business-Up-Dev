import { Test, TestingModule } from '@nestjs/testing';
import { PermissionDataSourceImpl } from './permission_data_source_impl';

describe('PermissionDataSourceImpl', () => {
  let provider: PermissionDataSourceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionDataSourceImpl],
    }).compile();

    provider = module.get<PermissionDataSourceImpl>(PermissionDataSourceImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
