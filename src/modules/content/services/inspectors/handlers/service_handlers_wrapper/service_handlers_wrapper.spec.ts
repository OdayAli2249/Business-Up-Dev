import { Test, TestingModule } from '@nestjs/testing';
import { ServiceHandlersWrapper } from './service_handlers_wrapper';

describe('ServiceHandlersWrapper', () => {
  let provider: ServiceHandlersWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceHandlersWrapper],
    }).compile();

    provider = module.get<ServiceHandlersWrapper>(ServiceHandlersWrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
