import { Test, TestingModule } from '@nestjs/testing';
import { HiringRequestService } from './hiring_request.service';

describe('HiringRequestService', () => {
  let service: HiringRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HiringRequestService],
    }).compile();

    service = module.get<HiringRequestService>(HiringRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
