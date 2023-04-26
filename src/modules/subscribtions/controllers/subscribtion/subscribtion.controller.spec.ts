import { Test, TestingModule } from '@nestjs/testing';
import { SubscribtionController } from './subscribtion.controller';

describe('SubscribtionController', () => {
  let controller: SubscribtionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribtionController],
    }).compile();

    controller = module.get<SubscribtionController>(SubscribtionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
