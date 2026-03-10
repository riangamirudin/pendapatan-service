import { IsInt, IsString, IsNotEmpty } from 'class-validator';

/**
 * Request body pembatalan STS (POST /pendapatan/sts/pembatalan).
 * Schema: StsPembatalanRequest (OpenAPI).
 */
export class StsPembatalanRequestDto {
  @IsInt()
  @IsNotEmpty({ message: 'id_sts wajib diisi' })
  id_sts: number;

  @IsString()
  @IsNotEmpty({ message: 'uraian wajib diisi' })
  uraian: string;
}
