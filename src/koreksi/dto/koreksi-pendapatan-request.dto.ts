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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Item rinci koreksi (per kode level 6, jenis, nilai).
 */
export class KoreksiRinciItemDto {
  @ApiProperty()
  @IsInt()
  kode_lvl6_id: number;

  @ApiProperty()
  @IsInt()
  jenis: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  nilai: number;
}

/**
 * Item rinci TBP yang terkait koreksi.
 */
export class KoreksiRinciTbpItemDto {
  @ApiProperty()
  @IsInt()
  id_tbp_grms: number;

  @ApiProperty()
  @IsString()
  nomor_bukti: string;

  @ApiProperty()
  @IsInt()
  id_tbp_bapenda: number;
}

/**
 * Request body koreksi pendapatan (PUT /pendapatan/koreksi).
 */
export class KoreksiPendapatanRequestDto {
  @ApiProperty()
  @IsInt()
  id_koreksi: number;

  @ApiProperty()
  @IsInt()
  sts_id_grms: number;

  @ApiProperty({ example: '900.1.13.1/058/2026' })
  @IsString()
  no_surat: string;

  @ApiProperty({ example: '2026-02-18' })
  @IsString()
  tanggal: string;

  @ApiProperty()
  @IsString()
  keterangan: string;

  @ApiProperty()
  @IsString()
  user_input: string;

  @ApiProperty()
  @IsString()
  user_org_input: string;

  @ApiProperty()
  @IsString()
  user_verifikasi: string;

  @ApiProperty()
  @IsString()
  user_org_verifikasi: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  total: number;

  @ApiProperty({ type: [KoreksiRinciItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KoreksiRinciItemDto)
  rinci: KoreksiRinciItemDto[];

  @ApiProperty({ type: [KoreksiRinciTbpItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KoreksiRinciTbpItemDto)
  rinci_tbp: KoreksiRinciTbpItemDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tanggal_verifikasi?: string;
}
