// backend/src/orders/orders.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Body 
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('reports/monthly')
  async getReport() {
    return this.ordersService.getMonthlyRevenue();
  }

  @Post()
  async placeOrder(@Body('totalPrice') totalPrice: number) {
    // Frontend'den gelen totalPrice değerini servisimize iletiyoruz
    return this.ordersService.createOrder(totalPrice);
  }
}