import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { VerifikasiPembayaranService } from './verifikasi-pembayaran.service';
import { VerifikasiPembayaranRequestDto } from './dto/verifikasi-pembayaran-request.dto';

@ApiTags('Pendapatan Service')
@Controller('pendapatan')
export class VerifikasiPembayaranController {
  constructor(private readonly verifikasiPembayaranService: VerifikasiPembayaranService) {}

  @Post('verifikasi-pembayaran')
  @ApiOperation({
    summary: 'Verifikasi pembayaran',
    description: 'Memverifikasi status pembayaran',
    operationId: 'verifikasiPembayaran',
  })
  @ApiBody({ type: VerifikasiPembayaranRequestDto })
  @ApiResponse({ status: 200, description: 'Hasil verifikasi' })
  verifikasiPembayaran(@Body() body: VerifikasiPembayaranRequestDto) {
    return this.verifikasiPembayaranService.verifikasi(body);
  }
}
