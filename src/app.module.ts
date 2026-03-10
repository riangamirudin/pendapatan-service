import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StsModule } from './sts/sts.module';
import { TbpModule } from './tbp/tbp.module';
import { KoreksiModule } from './koreksi/koreksi.module';
import { VerifikasiPembayaranModule } from './verifikasi-pembayaran/verifikasi-pembayaran.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TbpModule,
    StsModule,
    KoreksiModule,
    VerifikasiPembayaranModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
