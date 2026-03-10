import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsInt,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Item rinci koreksi (per kode level 6, jenis, nilai).
 */
export class KoreksiRinciItemDto {
  @IsInt()
  kode_lvl6_id: number;

  @IsInt()
  jenis: number;

  @IsNumber()
  @Min(0)
  nilai: number;
}

/**
 * Item rinci TBP yang terkait koreksi.
 */
export class KoreksiRinciTbpItemDto {
  @IsInt()
  id_tbp_grms: number;

  @IsString()
  nomor_bukti: string;

  @IsInt()
  id_tbp_bapenda: number;
}

/**
 * Request body koreksi pendapatan (PUT /pendapatan/koreksi).
 */
export class KoreksiPendapatanRequestDto {
  @IsInt()
  id_koreksi: number;

  @IsInt()
  sts_id_grms: number;

  @IsString()
  no_surat: string;

  @IsString()
  tanggal: string;

  @IsString()
  keterangan: string;

  @IsString()
  user_input: string;

  @IsString()
  user_org_input: string;

  @IsString()
  user_verifikasi: string;

  @IsString()
  user_org_verifikasi: string;

  @IsNumber()
  @Min(0)
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KoreksiRinciItemDto)
  rinci: KoreksiRinciItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KoreksiRinciTbpItemDto)
  rinci_tbp: KoreksiRinciTbpItemDto[];

  @IsOptional()
  @IsString()
  tanggal_verifikasi?: string;
}
