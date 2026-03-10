import { Body, Controller, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { KoreksiService } from './koreksi.service';
import { KoreksiPendapatanRequestDto } from './dto/koreksi-pendapatan-request.dto';

@ApiTags('Pendapatan Service')
@Controller('pendapatan')
export class KoreksiController {
  constructor(private readonly koreksiService: KoreksiService) {}

  @Put('koreksi')
  @ApiOperation({
    summary: 'Koreksi Pendapatan',
    description: 'Melakukan koreksi data pendapatan',
    operationId: 'koreksiPendapatan',
  })
  @ApiBody({ type: KoreksiPendapatanRequestDto })
  @ApiResponse({ status: 200, description: 'Koreksi berhasil' })
  koreksiPendapatan(@Body() body: KoreksiPendapatanRequestDto) {
    return this.koreksiService.koreksi(body);
  }
}
