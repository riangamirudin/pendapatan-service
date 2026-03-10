/**
 * Entity STS in-memory - shape sama dengan StsRequest.
 */
export class Sts {
  id_sts: number;
  no_sts: string;
  uraian: string;
  total: number;
  list_id_tbp_bapenda: number[];
  tanggal_sts: string;
  tanggal_setor?: string;
  nomor_referensi: string;
  workstation: string;
}
