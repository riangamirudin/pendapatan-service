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

/**
 * Data STS (Surat Tanda Setoran) - request body POST /pendapatan/sts dan response GET /pendapatan/sts.
 * Schema: StsRequest (OpenAPI).
 */
export class StsRequestDto {
  @IsInt()
  @IsNotEmpty({ message: 'id_sts wajib diisi' })
  id_sts: number;

  @IsString()
  @IsNotEmpty({ message: 'no_sts wajib diisi' })
  no_sts: string;

  @IsString()
  @IsNotEmpty({ message: 'uraian wajib diisi' })
  uraian: string;

  @IsNumber()
  @Min(0, { message: 'total harus >= 0' })
  @IsNotEmpty({ message: 'total wajib diisi' })
  total: number;

  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1, { message: 'list_id_tbp_bapenda minimal 1 item' })
  list_id_tbp_bapenda: number[];

  @IsDateString(undefined, { message: 'tanggal_sts harus format date (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'tanggal_sts wajib diisi' })
  tanggal_sts: string;

  @IsOptional()
  @IsDateString(undefined, { message: 'tanggal_setor harus format date-time' })
  tanggal_setor?: string;

  @IsString()
  @IsNotEmpty({ message: 'nomor_referensi wajib diisi' })
  nomor_referensi: string;

  @IsString()
  @IsNotEmpty({ message: 'workstation wajib diisi' })
  workstation: string;
}
