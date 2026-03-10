import { BadRequestException, Controller, Get, Post, Body, Query } from '@nestjs/common';
import { StsService } from './sts.service';
import { StsRequestDto } from './dto/sts-request.dto';
import { StsPembatalanRequestDto } from './dto/sts-pembatalan-request.dto';

@Controller('pendapatan')
export class StsController {
  constructor(private readonly stsService: StsService) {}

  /**
   * GET /pendapatan/sts?no_sts=...
   * Mendapatkan data STS berdasarkan nomor STS.
   */
  @Get('sts')
  getSts(@Query('no_sts') no_sts: string) {
    if (no_sts === undefined || no_sts === null || String(no_sts).trim() === '') {
      throw new BadRequestException('no_sts wajib diisi');
    }
    return this.stsService.getByNoSts(no_sts);
  }

  /**
   * POST /pendapatan/sts
   * Mengirim data STS (ke Bank Jateng Service). Response 201.
   */
  @Post('sts')
  postSts(@Body() body: StsRequestDto) {
    return this.stsService.postSts(body);
  }

  /**
   * POST /pendapatan/sts/pembatalan
   * Proses pembatalan Surat Tanda Setoran. Response 200.
   */
  @Post('sts/pembatalan')
  pembatalanSts(@Body() body: StsPembatalanRequestDto) {
    this.stsService.pembatalanSts(body);
  }
}
