import { Test, TestingModule } from '@nestjs/testing';
import { StsController } from './sts.controller';
import { StsService } from './sts.service';
import { TbpService } from '../tbp/tbp.service';

describe('StsController', () => {
  let controller: StsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StsController],
      providers: [
        StsService,
        {
          provide: TbpService,
          useValue: { getMissingIdTbpBapenda: () => [] },
        },
      ],
    }).compile();

    controller = module.get<StsController>(StsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
