import { Module } from '@nestjs/common';
import { StsService } from './sts.service';
import { StsController } from './sts.controller';

@Module({
  controllers: [StsController],
  providers: [StsService],
  exports: [StsService],
})
export class StsModule {}
