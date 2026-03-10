import { Module } from '@nestjs/common';
import { TbpService } from './tbp.service';
import { TbpController } from './tbp.controller';

@Module({
  controllers: [TbpController],
  providers: [TbpService],
})
export class TbpModule {}
