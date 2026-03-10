import { IsString, IsOptional } from 'class-validator';

/**
 * Request body verifikasi pembayaran (POST /pendapatan/verifikasi-pembayaran).
 * Schema: VerifikasiPembayaranRequest (OpenAPI).
 */
export class VerifikasiPembayaranRequestDto {
  @IsOptional()
  @IsString()
  idBilling?: string;

  @IsOptional()
  @IsString()
  kodeVerifikasi?: string;
}
