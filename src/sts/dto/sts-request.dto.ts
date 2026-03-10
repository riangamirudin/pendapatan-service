import {
  IsInt,
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Data STS (Surat Tanda Setoran) - request body POST /pendapatan/sts dan response GET /pendapatan/sts.
 */
export class StsRequestDto {
  @ApiProperty({ example: 40938 })
  @IsInt()
  @IsNotEmpty({ message: 'id_sts wajib diisi' })
  id_sts: number;

  @ApiProperty({ example: '3316245000040100' })
  @IsString()
  @IsNotEmpty({ message: 'no_sts wajib diisi' })
  no_sts: string;

  @ApiProperty({ example: 'RETRIBUSI PENYEDIAAN LAHAN PARKIR DI LUAR BADAN JALAN' })
  @IsString()
  @IsNotEmpty({ message: 'uraian wajib diisi' })
  uraian: string;

  @ApiProperty({ example: 233000 })
  @IsNumber()
  @Min(0, { message: 'total harus >= 0' })
  @IsNotEmpty({ message: 'total wajib diisi' })
  total: number;

  @ApiProperty({ example: [800023, 800024], type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1, { message: 'list_id_tbp_bapenda minimal 1 item' })
  list_id_tbp_bapenda: number[];

  @ApiProperty({ example: '2026-03-09', description: 'Format date YYYY-MM-DD' })
  @IsDateString(undefined, { message: 'tanggal_sts harus format date (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'tanggal_sts wajib diisi' })
  tanggal_sts: string;

  @ApiPropertyOptional({ example: '2026-03-09 20:27:17', description: 'Format date-time' })
  @IsOptional()
  @IsDateString(undefined, { message: 'tanggal_setor harus format date-time' })
  tanggal_setor?: string;

  @ApiProperty({ example: '655303' })
  @IsString()
  @IsNotEmpty({ message: 'nomor_referensi wajib diisi' })
  nomor_referensi: string;

  @ApiProperty({ example: 'QZRCSRVS' })
  @IsString()
  @IsNotEmpty({ message: 'workstation wajib diisi' })
  workstation: string;
}
