import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Request body verifikasi pembayaran (POST /pendapatan/verifikasi-pembayaran).
 */
export class VerifikasiPembayaranRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  idBilling?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  kodeVerifikasi?: string;
}
