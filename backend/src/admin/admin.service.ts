// src/admin/admin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { Order } from '../orders/entities/order.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private authService: AuthService 
  ) {}

  async resetSystem() {
    // 1. Verileri temizle
    await this.authService.createDefaultUsers();
    await this.orderRepo.clear(); 
    await this.bookRepo.clear();

    // 2. Golden State verilerini ekle
    const goldenBooks = [
      { title: 'Saatleri Ayarlama Enstitüsü', author: 'Ahmet Hamdi Tanpınar', price: 185.00, coverImage: 'https://picsum.photos/seed/b1/200/300' },
      { title: 'Benim Adım Kırmızı', author: 'Orhan Pamuk', price: 210.00, coverImage: 'https://picsum.photos/seed/b2/200/300' },
      { title: 'Beyaz Kale', author: 'Orhan Pamuk', price: 195.50, coverImage: 'https://picsum.photos/seed/b3/200/300' }
    ];

    await this.bookRepo.save(goldenBooks);
    
    // 3. Demo için rastgele satış verileri oluştur
// Son 4 ayı (Ocak, Şubat, Mart, Nisan) baz alacak şekilde sınırlayalım
const fakeOrders: Order[] = [];
for (let i = 0; i < 20; i++) {
    const order = new Order();
    
    // Rastgele 0 ile 3 arasında bir sayı seç (0=Nisan, 1=Mart, 2=Şubat, 3=Ocak)
    const monthsBack = Math.floor(Math.random() * 4); 
    
    const date = new Date();
    // Mevcut aydan geriye git
    date.setMonth(date.getMonth() - monthsBack);
    // Gün bilgisini de rastgele yaparak daha gerçekçi bir dağılım sağla
    date.setDate(Math.floor(Math.random() * 28) + 1);
    
    order.totalPrice = parseFloat((Math.random() * 500 + 50).toFixed(2));
    order.createdAt = date;
    fakeOrders.push(order);
}
    
    await this.orderRepo.save(fakeOrders);

    return { 
        status: 'Success',
        message: 'Sistem temizlendi ve Golden State verileri yüklendi.',
        timestamp: new Date().toISOString()
    };
  }

  // --- YENİ EKLENEN METOT: 100 RASTGELE KİTAP ÜRET ---
  async seedLargeData() {
    const titles = ["Geleceğin Peşinde", "Yazılımın Ruhu", "Veri Muhafızları", "Kodların Efendisi", "Dijital Dönüşüm", "Siber Şafak", "Algoritma Günlükleri", "Bulutların Ötesi", "Zeka Devrimi", "Sonsuz Döngü"];
    const authors = ["Ahmet Yılmaz", "Elif Demir", "Can Tekin", "Zeynep Kaya", "Murat Arslan", "Selin Yıldız", "Bora Çelik", "Deniz Aydın", "Hakan Kurt", "Aylin Öz"];
    const covers = [
      "https://picsum.photos/seed/b1/200/300",
      "https://picsum.photos/seed/b2/200/300",
      "https://picsum.photos/seed/b3/200/300",
      "https://picsum.photos/seed/b4/200/300",
      "https://picsum.photos/seed/b5/200/300",
      "https://picsum.photos/seed/b6/200/300",
      "https://picsum.photos/seed/b7/200/300",
      "https://picsum.photos/seed/b8/200/300",
      "https://picsum.photos/seed/b9/200/300",
      "https://picsum.photos/seed/b10/200/300"
    ];

    const bulkBooks:any = [];

    for (let i = 0; i < 100; i++) {
      bulkBooks.push({
        title: `${titles[Math.floor(Math.random() * titles.length)]} #${i + 1}`,
        author: authors[Math.floor(Math.random() * authors.length)],
        coverImage: covers[Math.floor(Math.random() * covers.length)],
        price: Math.floor(Math.random() * (500 - 50) + 50) 
      });
    }

    await this.bookRepo.save(bulkBooks);
    
    return {
      status: 'Success',
      message: '100 adet rastgele kitap başarıyla oluşturuldu.',
      count: 100
    };
  }
}