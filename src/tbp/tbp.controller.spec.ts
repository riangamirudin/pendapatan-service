import { Test, TestingModule } from '@nestjs/testing';
import { TbpController } from './tbp.controller';
import { TbpService } from './tbp.service';

describe('TbpController', () => {
  let controller: TbpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TbpController],
      providers: [TbpService],
    }).compile();

    controller = module.get<TbpController>(TbpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
