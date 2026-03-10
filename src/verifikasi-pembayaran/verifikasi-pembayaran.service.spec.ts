import { Test, TestingModule } from '@nestjs/testing';
import { VerifikasiPembayaranService } from './verifikasi-pembayaran.service';

describe('VerifikasiPembayaranService', () => {
  let service: VerifikasiPembayaranService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifikasiPembayaranService],
    }).compile();

    service = module.get<VerifikasiPembayaranService>(VerifikasiPembayaranService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
