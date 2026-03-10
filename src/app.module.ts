import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StsModule } from './sts/sts.module';
import { TbpModule } from './tbp/tbp.module';

@Module({
  imports: [TbpModule],
  imports: [StsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
