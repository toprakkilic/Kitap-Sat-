// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Frontend'den gelen isteklere izin veriyoruz
  app.enableCors(); 
  
  await app.listen(3001); // Backend'i 3001 portuna alalım, React 3000'de kalsın
  console.log(`Backend motoru 3001 portunda çalışıyor...`);
}
bootstrap();