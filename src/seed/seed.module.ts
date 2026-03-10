import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TbpModule } from '../tbp/tbp.module';
import { StsModule } from '../sts/sts.module';

@Module({
  imports: [TbpModule, StsModule],
  providers: [SeedService],
})
export class SeedModule {}
