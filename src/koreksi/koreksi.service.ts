import { Injectable } from '@nestjs/common';
import { KoreksiPendapatanRequestDto } from './dto/koreksi-pendapatan-request.dto';

/**
 * Service koreksi data pendapatan (operationId: koreksiPendapatan).
 */
@Injectable()
export class KoreksiService {
  /**
   * Melakukan koreksi data pendapatan. Response 200.
   */
  koreksi(dto: KoreksiPendapatanRequestDto): { message: string } {
    return {
      message: 'Koreksi berhasil',
    };
  }
}
