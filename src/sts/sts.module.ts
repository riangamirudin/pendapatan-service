import { Module } from '@nestjs/common';
import { StsService } from './sts.service';
import { StsController } from './sts.controller';
import { TbpModule } from '../tbp/tbp.module';

@Module({
  imports: [TbpModule],
  controllers: [StsController],
  providers: [StsService],
  exports: [StsService],
})
export class StsModule {}
