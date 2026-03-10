import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { StsRequestDto } from './dto/sts-request.dto';
import { StsResponseDto } from './dto/sts-response.dto';
import { StsPembatalanRequestDto } from './dto/sts-pembatalan-request.dto';
import { Sts } from './entities/sts.entity';
import { TbpService } from '../tbp/tbp.service';
import { KafkaService } from '../kafka/kafka.service';

/** Topic Kafka untuk event STS berhasil dikirim */
export const STS_TOPIC = 'pendapatan.sts.posted';

@Injectable()
export class StsService {
  private readonly logger = new Logger(StsService.name);
  /** Simpan STS by no_sts (in-memory). */
  private readonly byNoSts = new Map<string, Sts>();
  /** Simpan STS by id_sts untuk cek duplikat. */
  private readonly byIdSts = new Map<number, Sts>();

  constructor(
    private readonly tbpService: TbpService,
    private readonly kafkaService: KafkaService,
  ) {}

  /**
   * Get STS berdasarkan nomor STS (operationId: getSts).
   * Response schema: StsRequest.
   */
  getByNoSts(no_sts: string): StsRequestDto {
    const sts = this.byNoSts.get(no_sts);
    if (!sts) {
      throw new NotFoundException(`STS dengan no_sts ${no_sts} tidak ditemukan`);
    }
    return this.toRequestDto(sts);
  }

  /**
   * Post STS - kirim data ke sistem (operationId: postSts).
   * Relasi: list_id_tbp_bapenda harus refer ke id_tbp_bapenda TBP yang sudah ada.
   */
  postSts(dto: StsRequestDto): StsResponseDto {
    const missing = this.tbpService.getMissingIdTbpBapenda(dto.list_id_tbp_bapenda ?? []);
    if (missing.length > 0) {
      throw new BadRequestException(
        `list_id_tbp_bapenda tidak valid. Id TBP berikut tidak ditemukan: ${missing.join(', ')}. Buat TBP terlebih dahulu via POST /pendapatan/skr-tbp.`,
      );
    }
    if (this.byNoSts.has(dto.no_sts)) {
      throw new ConflictException(`STS dengan no_sts ${dto.no_sts} sudah ada`);
    }
    if (this.byIdSts.has(dto.id_sts)) {
      throw new ConflictException(`STS dengan id_sts ${dto.id_sts} sudah ada`);
    }
    const sts: Sts = {
      id_sts: dto.id_sts,
      no_sts: dto.no_sts,
      uraian: dto.uraian,
      total: dto.total,
      list_id_tbp_bapenda: [...dto.list_id_tbp_bapenda],
      tanggal_sts: dto.tanggal_sts,
      tanggal_setor: dto.tanggal_setor,
      nomor_referensi: dto.nomor_referensi,
      workstation: dto.workstation,
    };
    this.byNoSts.set(dto.no_sts, sts);
    this.byIdSts.set(dto.id_sts, sts);

    // Kirim event ke Kafka (fire-and-forget)
    const kafkaPayload = {
      event: 'sts.posted',
      id_sts: sts.id_sts,
      no_sts: sts.no_sts,
      uraian: sts.uraian,
      total: sts.total,
      list_id_tbp_bapenda: sts.list_id_tbp_bapenda,
      tanggal_sts: sts.tanggal_sts,
      tanggal_setor: sts.tanggal_setor,
      nomor_referensi: sts.nomor_referensi,
      workstation: sts.workstation,
      at: new Date().toISOString(),
    };
    this.logger.debug(
      `[Kafka] Akan kirim ke topic "${STS_TOPIC}" event=sts.posted id_sts=${sts.id_sts} no_sts=${sts.no_sts}`,
    );
    this.kafkaService.emit(STS_TOPIC, kafkaPayload);

    return {
      id_sts: sts.id_sts,
      no_sts: sts.no_sts,
      status: 'dikirim',
    };
  }

  /**
   * Pembatalan STS (operationId: pembatalanSts).
   * Request: StsPembatalanRequest, Response: 200.
   */
  pembatalanSts(dto: StsPembatalanRequestDto): void {
    const sts = this.byIdSts.get(dto.id_sts);
    if (!sts) {
      throw new NotFoundException(`STS dengan id_sts ${dto.id_sts} tidak ditemukan`);
    }
    this.byIdSts.delete(dto.id_sts);
    this.byNoSts.delete(sts.no_sts);
  }

  private toRequestDto(sts: Sts): StsRequestDto {
    return {
      id_sts: sts.id_sts,
      no_sts: sts.no_sts,
      uraian: sts.uraian,
      total: sts.total,
      list_id_tbp_bapenda: [...sts.list_id_tbp_bapenda],
      tanggal_sts: sts.tanggal_sts,
      tanggal_setor: sts.tanggal_setor,
      nomor_referensi: sts.nomor_referensi,
      workstation: sts.workstation,
    };
  }
}
