import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Pendapatan Service - APBD Flow')
    .setDescription(
      'API pengelolaan pendapatan APBD (Anggaran Pendapatan dan Belanja Daerah). Meliputi STS (Surat Tanda Setoran), TBP (Tanda Bukti Penerimaan), koreksi pendapatan, dan verifikasi pembayaran.',
    )
    .setVersion('1.0.0')
    .addTag('Pendapatan Service', 'Endpoints utama pengelolaan pendapatan')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
