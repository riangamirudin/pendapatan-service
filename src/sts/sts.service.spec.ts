import { Test, TestingModule } from '@nestjs/testing';
import { StsService } from './sts.service';
import { KafkaService } from '../kafka/kafka.service';

describe('StsService', () => {
  let service: StsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StsService,
        { provide: KafkaService, useValue: { emit: jest.fn().mockResolvedValue(undefined) } },
      ],
    }).compile();

    service = module.get<StsService>(StsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
