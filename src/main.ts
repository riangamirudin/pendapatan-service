import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Aktifkan validasi global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Hapus properti yang tidak ada di DTO
    forbidNonWhitelisted: true, // Tolak request jika ada properti asing
    transform: true, // Transformasi tipe data otomatis
  }));
  await app.listen(3000);
  console.log('Order Service is running on http://localhost:3000');
}
bootstrap();
