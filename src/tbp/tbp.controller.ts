import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TbpService } from './tbp.service';
import {
  CreateTbpDto,
  SrkTbpBatalRequestDto,
} from './dto/create-tbp.dto';

// Mengikuti path pada OpenAPI: /pendapatan/skr-tbp dan /pendapatan/srk-tbp/batal
@Controller('pendapatan')
export class TbpController {
  constructor(private readonly tbpService: TbpService) {}

  /**
   * GET /pendapatan/skr-tbp?no_tbp=...
   * operationId: getTbp
   */
  @Get('skr-tbp')
  getTbp(@Query('no_tbp') noTbp: string) {
    return this.tbpService.getTbp(noTbp);
  }

  /**
   * POST /pendapatan/skr-tbp
   * operationId: postTbp
   */
  @Post('skr-tbp')
  createTbp(@Body() dto: CreateTbpDto) {
    return this.tbpService.createTbp(dto);
  }

  /**
   * POST /pendapatan/srk-tbp/batal
   * operationId: srkTbpBatal
   */
  @Post('srk-tbp/batal')
  cancelTbp(@Body() dto: SrkTbpBatalRequestDto) {
    return this.tbpService.cancelTbp(dto);
  }
}
