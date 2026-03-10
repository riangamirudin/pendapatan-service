import { BadRequestException, Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { StsService } from './sts.service';
import { StsRequestDto } from './dto/sts-request.dto';
import { StsPembatalanRequestDto } from './dto/sts-pembatalan-request.dto';
import { StsResponseDto } from './dto/sts-response.dto';

@ApiTags('Pendapatan Service')
@Controller('pendapatan')
export class StsController {
  constructor(private readonly stsService: StsService) {}

  @Get('sts')
  @ApiOperation({
    summary: 'Get STS',
    description: 'Mendapatkan data STS (Surat Tanda Setoran) berdasarkan nomor STS',
    operationId: 'getSts',
  })
  @ApiQuery({ name: 'no_sts', required: true, description: 'Nomor STS' })
  @ApiResponse({ status: 200, description: 'Data STS', type: StsRequestDto })
  @ApiResponse({ status: 400, description: 'no_sts wajib diisi' })
  @ApiResponse({ status: 404, description: 'STS tidak ditemukan' })
  getSts(@Query('no_sts') no_sts: string) {
    if (no_sts === undefined || no_sts === null || String(no_sts).trim() === '') {
      throw new BadRequestException('no_sts wajib diisi');
    }
    return this.stsService.getByNoSts(no_sts);
  }

  @Post('sts')
  @ApiOperation({
    summary: 'Post STS',
    description: 'Mengirim data STS (Surat Tanda Setoran) ke Bank Jateng Service',
    operationId: 'postSts',
  })
  @ApiBody({ type: StsRequestDto })
  @ApiResponse({ status: 201, description: 'STS berhasil dikirim', type: StsResponseDto })
  @ApiResponse({ status: 400, description: 'Request tidak valid atau list_id_tbp_bapenda tidak ditemukan' })
  @ApiResponse({ status: 409, description: 'STS dengan no_sts atau id_sts sudah ada' })
  postSts(@Body() body: StsRequestDto) {
    return this.stsService.postSts(body);
  }

  @Post('sts/pembatalan')
  @ApiOperation({
    summary: 'Pembatalan STS',
    description: 'Proses pembatalan Surat Tanda Setoran',
    operationId: 'pembatalanSts',
  })
  @ApiBody({ type: StsPembatalanRequestDto })
  @ApiResponse({ status: 200, description: 'Pembatalan berhasil' })
  @ApiResponse({ status: 404, description: 'STS tidak ditemukan' })
  pembatalanSts(@Body() body: StsPembatalanRequestDto) {
    this.stsService.pembatalanSts(body);
  }
}
