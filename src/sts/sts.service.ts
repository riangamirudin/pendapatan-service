import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { StsRequestDto } from './dto/sts-request.dto';
import { StsResponseDto } from './dto/sts-response.dto';
import { StsPembatalanRequestDto } from './dto/sts-pembatalan-request.dto';
import { Sts } from './entities/sts.entity';
import { KafkaService } from '../kafka/kafka.service';

export const STS_TOPIC = 'pendapatan.sts.posted';

@Injectable()
export class StsService {
  private readonly logger = new Logger(StsService.name);
  /** Penyimpanan STS in-memory (array). */
  private readonly list: Sts[] = [];

  constructor(private readonly kafkaService: KafkaService) {}

  getByNoSts(no_sts: string): StsRequestDto {
    const sts = this.list.find((s) => s.no_sts === no_sts);
    if (!sts) {
      throw new NotFoundException(`STS dengan no_sts ${no_sts} tidak ditemukan`);
    }
    return this.toRequestDto(sts);
  }

  postSts(dto: StsRequestDto): StsResponseDto {
    if (this.list.some((s) => s.no_sts === dto.no_sts)) {
      throw new ConflictException(`STS dengan no_sts ${dto.no_sts} sudah ada`);
    }
    if (this.list.some((s) => s.id_sts === dto.id_sts)) {
      throw new ConflictException(`STS dengan id_sts ${dto.id_sts} sudah ada`);
    }
    const sts: Sts = {
      id_sts: dto.id_sts,
      no_sts: dto.no_sts,
      uraian: dto.uraian,
      total: dto.total,
      list_id_tbp_bapenda: [...(dto.list_id_tbp_bapenda ?? [])],
      tanggal_sts: dto.tanggal_sts,
      tanggal_setor: dto.tanggal_setor,
      nomor_referensi: dto.nomor_referensi,
      workstation: dto.workstation,
    };
    this.list.push(sts);

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
      `[Kafka] topic="${STS_TOPIC}" id_sts=${sts.id_sts} no_sts=${sts.no_sts}`,
    );
    this.kafkaService.emit(STS_TOPIC, kafkaPayload);

    return { id_sts: sts.id_sts, no_sts: sts.no_sts, status: 'dikirim' };
  }

  pembatalanSts(dto: StsPembatalanRequestDto): void {
    const idx = this.list.findIndex((s) => s.id_sts === dto.id_sts);
    if (idx === -1) {
      throw new NotFoundException(`STS dengan id_sts ${dto.id_sts} tidak ditemukan`);
    }
    this.list.splice(idx, 1);
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
