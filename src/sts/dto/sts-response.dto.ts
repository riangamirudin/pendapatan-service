import { IsInt, IsString, IsNotEmpty } from 'class-validator';

/**
 * Response setelah STS berhasil dikirim (POST /pendapatan/sts).
 * Schema: StsResponse (OpenAPI).
 */
export class StsResponseDto {
  @IsInt()
  @IsNotEmpty()
  id_sts: number;

  @IsString()
  @IsNotEmpty()
  no_sts: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
