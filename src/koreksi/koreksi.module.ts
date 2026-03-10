import { Module } from '@nestjs/common';
import { KoreksiController } from './koreksi.controller';
import { KoreksiService } from './koreksi.service';

@Module({
  controllers: [KoreksiController],
  providers: [KoreksiService],
})
export class KoreksiModule {}
