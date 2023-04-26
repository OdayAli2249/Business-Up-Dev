import { Test, TestingModule } from '@nestjs/testing';
import { HiringRequestController } from './hiring_request.controller';

describe('HiringRequestController', () => {
  let controller: HiringRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HiringRequestController],
    }).compile();

    controller = module.get<HiringRequestController>(HiringRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
