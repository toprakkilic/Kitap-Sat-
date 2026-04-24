// backend/src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  async getMonthlyRevenue() {
    const orders = await this.orderRepo.find();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Veriyi frontend grafiğine uygun (Monthly Revenue) formatına getiriyoruz
    const report = months.map((month, index) => {
      const monthlyTotal = orders
        .filter(order => new Date(order.createdAt).getMonth() === index)
        .reduce((sum, order) => sum + Number(order.totalPrice), 0);
      
      return { month, revenue: monthlyTotal };
    });

    return report;
  }

  async createOrder(totalPrice: number) {
    const newOrder = this.orderRepo.create({ totalPrice });
    return this.orderRepo.save(newOrder);
  }
}