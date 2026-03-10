export class TbpRinciItemDto {
  id_ssk_grms: number | null;
  id_rab_grms: number | null;
  id_lvl6_grms: number;
  total_grms: number;
}

// Merepresentasikan schema TbpRequest pada OpenAPI
export class CreateTbpDto {
  jenis_dokumen: number;
  id_skr_bapenda: number;
  id_tbp_bapenda: number;
  no_skr_bapenda: string;
  no_tbp_bapenda: string;
  org_id_grms: number;
  tanggal: string; // format date (YYYY-MM-DD)
  uraian: string;
  nama_penyetor?: string;
  alamat_penyetor?: string;
  npwp_penyetor?: string;
  tanggal_jatuh_tempo?: string; // format date (YYYY-MM-DD)
  total: number;
  rinci: TbpRinciItemDto[];
}

// Merepresentasikan schema TbpResponse pada OpenAPI
export class TbpResponseDto {
  jenis_dokumen: number;
  id_skr_bapenda: number;
  id_tbp_bapenda: number;
  no_skr_bapenda: string;
  no_tbp_bapenda: string;
  org_id_grms: number;
  tanggal: string;
  uraian: string;
  nama_penyetor?: string;
  alamat_penyetor?: string;
  npwp_penyetor?: string;
  tanggal_jatuh_tempo?: string;
  total: number;
  rinci: TbpRinciItemDto[];
}

// SrkTbpBatalRequest & Response sesuai schema OpenAPI
export class SrkTbpBatalRequestDto {
  id_ptbp: number;
  no_ptbp: string;
  tanggal_pengajuan: string; // format date
  uraian: string;
  total: number;
  list_id_tbp_bapenda: number[];
  tanggal_verifikasi?: string; // format date-time
}

export class SrkTbpBatalResponseDto {
  id_ptbp: number;
  no_ptbp: string;
  uraian: string;
}
