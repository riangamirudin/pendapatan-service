import { Test, TestingModule } from '@nestjs/testing';
import { VerifikasiPembayaranController } from './verifikasi-pembayaran.controller';
import { VerifikasiPembayaranService } from './verifikasi-pembayaran.service';

describe('VerifikasiPembayaranController', () => {
  let controller: VerifikasiPembayaranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifikasiPembayaranController],
      providers: [VerifikasiPembayaranService],
    }).compile();

    controller = module.get<VerifikasiPembayaranController>(VerifikasiPembayaranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
