import { Test, TestingModule } from '@nestjs/testing';
import { KoreksiController } from './koreksi.controller';
import { KoreksiService } from './koreksi.service';

describe('KoreksiController', () => {
  let controller: KoreksiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KoreksiController],
      providers: [KoreksiService],
    }).compile();

    controller = module.get<KoreksiController>(KoreksiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
