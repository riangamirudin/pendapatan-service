import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TbpRinciItemDto {
  @ApiPropertyOptional({ nullable: true })
  id_ssk_grms: number | null;

  @ApiPropertyOptional({ nullable: true })
  id_rab_grms: number | null;

  @ApiProperty()
  id_lvl6_grms: number;

  @ApiProperty()
  total_grms: number;
}

/** Request body POST /pendapatan/skr-tbp (TbpRequest) */
export class CreateTbpDto {
  @ApiProperty({ example: 3 })
  jenis_dokumen: number;

  @ApiPropertyOptional()
  id_skr_bapenda: number;

  @ApiProperty({ example: 800023 })
  id_tbp_bapenda: number;

  @ApiProperty({ example: '3346245000189301' })
  no_skr_bapenda: string;

  @ApiProperty({ example: '3326245000094901' })
  no_tbp_bapenda: string;

  @ApiProperty({ example: 6245 })
  org_id_grms: number;

  @ApiProperty({ example: '2026-03-09', description: 'Format date YYYY-MM-DD' })
  tanggal: string;

  @ApiProperty({ example: 'Pembayaran - Roda 2' })
  uraian: string;

  @ApiPropertyOptional()
  nama_penyetor?: string;

  @ApiPropertyOptional()
  alamat_penyetor?: string;

  @ApiPropertyOptional()
  npwp_penyetor?: string;

  @ApiPropertyOptional({ description: 'Format date YYYY-MM-DD' })
  tanggal_jatuh_tempo?: string;

  @ApiProperty({ example: 209000 })
  total: number;

  @ApiProperty({ type: [TbpRinciItemDto] })
  rinci: TbpRinciItemDto[];
}

/** Response GET /pendapatan/skr-tbp dan POST /pendapatan/skr-tbp (TbpResponse) */
export class TbpResponseDto {
  @ApiProperty()
  jenis_dokumen: number;

  @ApiProperty()
  id_skr_bapenda: number;

  @ApiProperty()
  id_tbp_bapenda: number;

  @ApiProperty()
  no_skr_bapenda: string;

  @ApiProperty()
  no_tbp_bapenda: string;

  @ApiProperty()
  org_id_grms: number;

  @ApiProperty()
  tanggal: string;

  @ApiProperty()
  uraian: string;

  @ApiPropertyOptional()
  nama_penyetor?: string;

  @ApiPropertyOptional()
  alamat_penyetor?: string;

  @ApiPropertyOptional()
  npwp_penyetor?: string;

  @ApiPropertyOptional()
  tanggal_jatuh_tempo?: string;

  @ApiProperty()
  total: number;

  @ApiProperty({ type: [TbpRinciItemDto] })
  rinci: TbpRinciItemDto[];
}

/** Request body POST /pendapatan/srk-tbp/batal (SrkTbpBatalRequest) */
export class SrkTbpBatalRequestDto {
  @ApiProperty()
  id_ptbp: number;

  @ApiProperty({ example: '3356164000000102' })
  no_ptbp: string;

  @ApiProperty({ example: '2026-02-10', description: 'Format date' })
  tanggal_pengajuan: string;

  @ApiProperty()
  uraian: string;

  @ApiProperty()
  total: number;

  @ApiProperty({ type: [Number], example: [740932, 746306] })
  list_id_tbp_bapenda: number[];

  @ApiPropertyOptional({ description: 'Format date-time' })
  tanggal_verifikasi?: string;
}

/** Response POST /pendapatan/srk-tbp/batal (SrkTbpBatalResponse) */
export class SrkTbpBatalResponseDto {
  @ApiProperty()
  id_ptbp: number;

  @ApiProperty()
  no_ptbp: string;

  @ApiProperty()
  uraian: string;
}
