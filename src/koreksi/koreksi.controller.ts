import { Body, Controller, Put } from '@nestjs/common';
import { KoreksiService } from './koreksi.service';
import { KoreksiPendapatanRequestDto } from './dto/koreksi-pendapatan-request.dto';

/**
 * PUT /pendapatan/koreksi - Koreksi Pendapatan (OpenAPI: Pendapatan Service).
 */
@Controller('pendapatan')
export class KoreksiController {
  constructor(private readonly koreksiService: KoreksiService) {}

  @Put('koreksi')
  koreksiPendapatan(@Body() body: KoreksiPendapatanRequestDto) {
    return this.koreksiService.koreksi(body);
  }
}
