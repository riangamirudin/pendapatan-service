import { Injectable } from '@nestjs/common';
import { VerifikasiPembayaranRequestDto } from './dto/verifikasi-pembayaran-request.dto';

/**
 * Service verifikasi status pembayaran (operationId: verifikasiPembayaran).
 */
@Injectable()
export class VerifikasiPembayaranService {
  /**
   * Memverifikasi status pembayaran. Response 200.
   */
  verifikasi(dto: VerifikasiPembayaranRequestDto): { verified: boolean; message: string } {
    return {
      verified: true,
      message: 'Hasil verifikasi',
    };
  }
}
