// backend/src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Kitabevi Online Satış Sistemi API - Çalışıyor 🚀';
  }

  getServerStatus() {
    return {
      status: 'online',
      version: '1.0.0',
      description: 'Software Engineering Homework - Golden State Implementation',
      timestamp: new Date().toISOString(),
    };
  }
}