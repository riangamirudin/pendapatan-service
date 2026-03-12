import { Test, TestingModule } from '@nestjs/testing';
import { StsController } from './sts.controller';
import { StsService } from './sts.service';
import { KafkaService } from '../kafka/kafka.service';

describe('StsController', () => {
  let controller: StsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StsController],
      providers: [
        StsService,
        { provide: KafkaService, useValue: { emit: jest.fn().mockResolvedValue(undefined) } },
      ],
    }).compile();

    controller = module.get<StsController>(StsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
