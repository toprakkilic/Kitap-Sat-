// backend/src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { BooksModule } from '../books/books.module';
import { OrdersModule } from '../orders/orders.module';
import { AuthModule } from '../auth/auth.module'; // Bunu ekle

@Module({
  imports: [
    BooksModule, 
    OrdersModule, 
    AuthModule // Bunu buraya eklemeyi unutma!
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}