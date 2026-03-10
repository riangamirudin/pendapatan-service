import { Test, TestingModule } from '@nestjs/testing';
import { KoreksiService } from './koreksi.service';

describe('KoreksiService', () => {
  let service: KoreksiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KoreksiService],
    }).compile();

    service = module.get<KoreksiService>(KoreksiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
