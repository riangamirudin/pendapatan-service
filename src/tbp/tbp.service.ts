import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateTbpDto,
  SrkTbpBatalRequestDto,
  SrkTbpBatalResponseDto,
  TbpResponseDto,
} from './dto/create-tbp.dto';
import { Tbp } from './entities/tbp.entity';

@Injectable()
export class TbpService {
  /** Simpan TBP by no_tbp_bapenda (untuk GET /pendapatan/skr-tbp?no_tbp=). */
  private readonly byNoTbp = new Map<string, Tbp>();
  /** Simpan TBP by id_tbp_bapenda (untuk relasi STS.list_id_tbp_bapenda). */
  private readonly byIdTbpBapenda = new Map<number, Tbp>();

  /**
   * GET /pendapatan/skr-tbp - Mendapatkan data TBP berdasarkan nomor TBP.
   * Relasi: STS memakai list_id_tbp_bapenda yang harus refer ke id_tbp_bapenda di sini.
   */
  getTbp(noTbp: string): TbpResponseDto {
    if (!noTbp?.trim()) {
      throw new BadRequestException('no_tbp wajib diisi');
    }
    const tbp = this.byNoTbp.get(noTbp.trim());
    if (!tbp) {
      throw new NotFoundException(`TBP dengan no_tbp ${noTbp} tidak ditemukan`);
    }
    return this.toResponseDto(tbp);
  }

  /**
   * POST /pendapatan/skr-tbp - Membuat / mengirim data TBP.
   */
  createTbp(payload: CreateTbpDto): TbpResponseDto {
    const noTbp = payload.no_tbp_bapenda?.trim();
    if (!noTbp) {
      throw new BadRequestException('no_tbp_bapenda wajib diisi');
    }
    if (this.byNoTbp.has(noTbp)) {
      throw new ConflictException(`TBP dengan no_tbp_bapenda ${noTbp} sudah ada`);
    }
    if (payload.id_tbp_bapenda != null && this.byIdTbpBapenda.has(payload.id_tbp_bapenda)) {
      throw new ConflictException(
        `TBP dengan id_tbp_bapenda ${payload.id_tbp_bapenda} sudah ada`,
      );
    }
    const tbp: Tbp = {
      jenis_dokumen: payload.jenis_dokumen ?? 3,
      id_skr_bapenda: payload.id_skr_bapenda ?? 0,
      id_tbp_bapenda: payload.id_tbp_bapenda ?? 0,
      no_skr_bapenda: payload.no_skr_bapenda ?? '',
      no_tbp_bapenda: noTbp,
      org_id_grms: payload.org_id_grms ?? 0,
      tanggal: payload.tanggal ?? '',
      uraian: payload.uraian ?? '',
      nama_penyetor: payload.nama_penyetor,
      alamat_penyetor: payload.alamat_penyetor,
      npwp_penyetor: payload.npwp_penyetor,
      tanggal_jatuh_tempo: payload.tanggal_jatuh_tempo,
      total: payload.total ?? 0,
      rinci: payload.rinci ?? [],
    };
    this.byNoTbp.set(noTbp, tbp);
    if (tbp.id_tbp_bapenda != null) {
      this.byIdTbpBapenda.set(tbp.id_tbp_bapenda, tbp);
    }
    return this.toResponseDto(tbp);
  }

  /**
   * POST /pendapatan/srk-tbp/batal - Pembatalan TBP melalui SRK-TBP.
   */
  cancelTbp(payload: SrkTbpBatalRequestDto): SrkTbpBatalResponseDto {
    for (const id of payload.list_id_tbp_bapenda ?? []) {
      if (!this.byIdTbpBapenda.has(id)) {
        throw new BadRequestException(
          `id_tbp_bapenda ${id} tidak ditemukan, tidak dapat membatalkan`,
        );
      }
    }
    return {
      id_ptbp: payload.id_ptbp,
      no_ptbp: payload.no_ptbp,
      uraian: payload.uraian ?? 'Pembatalan TBP',
    };
  }

  /**
   * Untuk relasi STS: validasi bahwa semua id di list_id_tbp_bapenda terdaftar sebagai TBP.
   * Dipanggil StsService sebelum membuat STS.
   */
  hasIdTbpBapenda(ids: number[]): boolean {
    if (!ids?.length) return false;
    return ids.every((id) => this.byIdTbpBapenda.has(id));
  }

  /**
   * Daftar id_tbp_bapenda yang tidak ada (untuk pesan error).
   */
  getMissingIdTbpBapenda(ids: number[]): number[] {
    if (!ids?.length) return [];
    return ids.filter((id) => !this.byIdTbpBapenda.has(id));
  }

  private toResponseDto(t: Tbp): TbpResponseDto {
    return {
      jenis_dokumen: t.jenis_dokumen,
      id_skr_bapenda: t.id_skr_bapenda,
      id_tbp_bapenda: t.id_tbp_bapenda,
      no_skr_bapenda: t.no_skr_bapenda,
      no_tbp_bapenda: t.no_tbp_bapenda,
      org_id_grms: t.org_id_grms,
      tanggal: t.tanggal,
      uraian: t.uraian,
      nama_penyetor: t.nama_penyetor,
      alamat_penyetor: t.alamat_penyetor,
      npwp_penyetor: t.npwp_penyetor,
      tanggal_jatuh_tempo: t.tanggal_jatuh_tempo,
      total: t.total,
      rinci: t.rinci ? [...t.rinci] : [],
    };
  }
}
