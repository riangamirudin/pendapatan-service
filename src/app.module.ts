import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TbpModule } from './tbp/tbp.module';

@Module({
  imports: [TbpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
