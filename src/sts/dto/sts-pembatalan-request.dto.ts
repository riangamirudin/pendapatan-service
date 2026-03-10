import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Request body pembatalan STS (POST /pendapatan/sts/pembatalan).
 */
export class StsPembatalanRequestDto {
  @ApiProperty({ description: 'ID STS yang akan dibatalkan' })
  @IsInt()
  @IsNotEmpty({ message: 'id_sts wajib diisi' })
  id_sts: number;

  @ApiProperty({ description: 'Uraian / alasan pembatalan' })
  @IsString()
  @IsNotEmpty({ message: 'uraian wajib diisi' })
  uraian: string;
}
