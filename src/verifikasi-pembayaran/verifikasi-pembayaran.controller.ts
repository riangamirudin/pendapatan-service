import { Body, Controller, Post } from '@nestjs/common';
import { VerifikasiPembayaranService } from './verifikasi-pembayaran.service';
import { VerifikasiPembayaranRequestDto } from './dto/verifikasi-pembayaran-request.dto';

/**
 * POST /pendapatan/verifikasi-pembayaran - Verifikasi pembayaran (OpenAPI: Pendapatan Service).
 */
@Controller('pendapatan')
export class VerifikasiPembayaranController {
  constructor(private readonly verifikasiPembayaranService: VerifikasiPembayaranService) {}

  @Post('verifikasi-pembayaran')
  verifikasiPembayaran(@Body() body: VerifikasiPembayaranRequestDto) {
    return this.verifikasiPembayaranService.verifikasi(body);
  }
}
