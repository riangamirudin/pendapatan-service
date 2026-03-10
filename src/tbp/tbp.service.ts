import { Injectable } from '@nestjs/common';
import {
  CreateTbpDto,
  SrkTbpBatalRequestDto,
  SrkTbpBatalResponseDto,
  TbpResponseDto,
} from './dto/create-tbp.dto';

@Injectable()
export class TbpService {
  /**
   * Implementasi dummy untuk POST /pendapatan/skr-tbp
   * Mengembalikan data TBP sesuai contoh di OpenAPI.
   */
  createTbp(payload: CreateTbpDto): TbpResponseDto {
    return {
      jenis_dokumen: payload.jenis_dokumen ?? 3,
      id_skr_bapenda: payload.id_skr_bapenda ?? 796795,
      id_tbp_bapenda: payload.id_tbp_bapenda ?? 800023,
      no_skr_bapenda: payload.no_skr_bapenda ?? '3346245000189301',
      no_tbp_bapenda: payload.no_tbp_bapenda ?? '3326245000094901',
      org_id_grms: payload.org_id_grms ?? 6245,
      tanggal: payload.tanggal ?? '2026-03-09',
      uraian: payload.uraian ?? 'Pembayaran - Roda 2',
      nama_penyetor: payload.nama_penyetor ?? 'CASONO',
      alamat_penyetor:
        payload.alamat_penyetor ??
        'WIROSARI DAMAI BLOK G NO. 30 RT 006 RW 007 SAMBONG BATANG',
      npwp_penyetor: payload.npwp_penyetor ?? '-',
      tanggal_jatuh_tempo: payload.tanggal_jatuh_tempo ?? '2026-03-23',
      total: payload.total ?? 209000,
      rinci:
        payload.rinci && payload.rinci.length > 0
          ? payload.rinci
          : [
              {
                id_ssk_grms: null,
                id_rab_grms: null,
                id_lvl6_grms: 276,
                total_grms: 209000,
              },
            ],
    };
  }

  /**
   * Implementasi dummy untuk GET /pendapatan/skr-tbp
   * Mengabaikan parameter no_tbp dan selalu mengirim contoh yang sama.
   */
  getTbp(_noTbp: string): TbpResponseDto {
    return {
      jenis_dokumen: 3,
      id_skr_bapenda: 796795,
      id_tbp_bapenda: 800023,
      no_skr_bapenda: '3346245000189301',
      no_tbp_bapenda: '3326245000094901',
      org_id_grms: 6245,
      tanggal: '2026-03-09',
      uraian: 'Pembayaran - Roda 2',
      nama_penyetor: 'CASONO',
      alamat_penyetor:
        'WIROSARI DAMAI BLOK G NO. 30 RT 006 RW 007 SAMBONG BATANG',
      npwp_penyetor: '-',
      tanggal_jatuh_tempo: '2026-03-23',
      total: 209000,
      rinci: [
        {
          id_ssk_grms: null,
          id_rab_grms: null,
          id_lvl6_grms: 276,
          total_grms: 209000,
        },
      ],
    };
  }

  /**
   * Implementasi dummy untuk POST /pendapatan/srk-tbp/batal
   */
  cancelTbp(payload: SrkTbpBatalRequestDto): SrkTbpBatalResponseDto {
    return {
      id_ptbp: payload.id_ptbp ?? 19,
      no_ptbp: payload.no_ptbp ?? '3356164000000102',
      uraian:
        payload.uraian ??
        'Pembatalan TBP Pendapatan dikarenakan double input ...',
    };
  }
}
