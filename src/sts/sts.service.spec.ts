import { Test, TestingModule } from '@nestjs/testing';
import { StsService } from './sts.service';
import { TbpService } from '../tbp/tbp.service';
import { KafkaService } from '../kafka/kafka.service';

describe('StsService', () => {
  let service: StsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StsService,
        { provide: TbpService, useValue: { getMissingIdTbpBapenda: () => [] } },
        { provide: KafkaService, useValue: { emit: jest.fn().mockResolvedValue(undefined) } },
      ],
    }).compile();

    service = module.get<StsService>(StsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
