import { TbpRinciItemDto } from '../dto/create-tbp.dto';

// Entity sederhana yang mengikuti struktur TbpResponse
export class Tbp {
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
