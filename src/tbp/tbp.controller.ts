import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { TbpService } from './tbp.service';
import {
  CreateTbpDto,
  SrkTbpBatalRequestDto,
  SrkTbpBatalResponseDto,
  TbpResponseDto,
} from './dto/create-tbp.dto';

@ApiTags('Pendapatan Service')
@Controller('pendapatan')
export class TbpController {
  constructor(private readonly tbpService: TbpService) {}

  @Get('skr-tbp')
  @ApiOperation({
    summary: 'Get TBP',
    description: 'Mendapatkan data TBP (Tanda Bukti Penerimaan) berdasarkan nomor TBP',
    operationId: 'getTbp',
  })
  @ApiQuery({ name: 'no_tbp', required: true, description: 'Nomor TBP (Tanda Bukti Penerimaan)' })
  @ApiResponse({ status: 200, description: 'Data TBP', type: TbpResponseDto })
  @ApiResponse({ status: 400, description: 'no_tbp wajib diisi' })
  @ApiResponse({ status: 404, description: 'TBP tidak ditemukan' })
  getTbp(@Query('no_tbp') noTbp: string) {
    return this.tbpService.getTbp(noTbp);
  }

  @Post('skr-tbp')
  @ApiOperation({
    summary: 'Post TBP',
    description: 'Mengirim / membuat data TBP (Tanda Bukti Penerimaan)',
    operationId: 'postTbp',
  })
  @ApiBody({ type: CreateTbpDto })
  @ApiResponse({ status: 201, description: 'TBP berhasil dibuat', type: TbpResponseDto })
  @ApiResponse({ status: 400, description: 'Request tidak valid' })
  @ApiResponse({ status: 409, description: 'TBP dengan no_tbp_bapenda atau id_tbp_bapenda sudah ada' })
  createTbp(@Body() dto: CreateTbpDto) {
    return this.tbpService.createTbp(dto);
  }

  @Post('srk-tbp/batal')
  @ApiOperation({
    summary: 'Pembatalan TBP (SRK-TBP Batal)',
    description: 'Proses pembatalan TBP (Tanda Bukti Penerimaan) melalui SRK-TBP',
    operationId: 'srkTbpBatal',
  })
  @ApiBody({ type: SrkTbpBatalRequestDto })
  @ApiResponse({ status: 200, description: 'Pembatalan berhasil', type: SrkTbpBatalResponseDto })
  @ApiResponse({ status: 400, description: 'Request tidak valid atau id_tbp_bapenda tidak ditemukan' })
  cancelTbp(@Body() dto: SrkTbpBatalRequestDto) {
    return this.tbpService.cancelTbp(dto);
  }
}
