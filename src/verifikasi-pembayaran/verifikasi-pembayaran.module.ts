import { Module } from '@nestjs/common';
import { VerifikasiPembayaranController } from './verifikasi-pembayaran.controller';
import { VerifikasiPembayaranService } from './verifikasi-pembayaran.service';

@Module({
  controllers: [VerifikasiPembayaranController],
  providers: [VerifikasiPembayaranService],
})
export class VerifikasiPembayaranModule {}
