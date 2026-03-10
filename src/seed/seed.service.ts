import { Injectable, OnModuleInit } from '@nestjs/common';
import { TbpService } from '../tbp/tbp.service';
import { StsService } from '../sts/sts.service';
import {
  mockPostTbpRequest,
  mockPostTbpRequest2,
  mockPostStsRequest,
} from '../mock/endpoint-mock-data';
import { CreateTbpDto } from '../tbp/dto/create-tbp.dto';
import { StsRequestDto } from '../sts/dto/sts-request.dto';

/**
 * Seed mock data ke TBP dan STS saat aplikasi startup.
 * GET /pendapatan/skr-tbp dan GET /pendapatan/sts akan mengembalikan data ini.
 */
@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly tbpService: TbpService,
    private readonly stsService: StsService,
  ) {}

  onModuleInit(): void {
    this.seed();
  }

  private seed(): void {
    try {
      this.seedTbp();
      this.seedSts();
      console.log('[Seed] Mock data TBP dan STS berhasil dimuat.');
    } catch (err) {
      console.warn('[Seed] Seed mock data gagal atau data sudah ada:', (err as Error).message);
    }
  }

  private seedTbp(): void {
    const payloads: CreateTbpDto[] = [
      mockPostTbpRequest as CreateTbpDto,
      mockPostTbpRequest2 as CreateTbpDto,
    ];
    for (const payload of payloads) {
      try {
        this.tbpService.createTbp(payload);
      } catch {
        // Skip jika sudah ada (duplikat)
      }
    }
  }

  private seedSts(): void {
    try {
      this.stsService.postSts(mockPostStsRequest as StsRequestDto);
    } catch {
      // Skip jika sudah ada
    }
  }
}
