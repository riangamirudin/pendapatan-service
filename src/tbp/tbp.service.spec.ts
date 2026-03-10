import { Test, TestingModule } from '@nestjs/testing';
import { TbpService } from './tbp.service';

describe('TbpService', () => {
  let service: TbpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TbpService],
    }).compile();

    service = module.get<TbpService>(TbpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
