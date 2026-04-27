// src/admin/admin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
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

    // 2. Golden State verilerini ekle (7 Adet Gerçek Kitap)
    const goldenBooks = [
      { 
        title: 'Saatleri Ayarlama Enstitüsü', 
        author: 'Ahmet Hamdi Tanpınar', 
        price: 185.00, 
        coverImage: 'https://covers.openlibrary.org/b/id/12354821-L.jpg' 
      },
      { 
        title: '1984', 
        author: 'George Orwell', 
        price: 145.00, 
        coverImage: 'https://covers.openlibrary.org/b/id/12693610-L.jpg' 
      },
      { 
        title: 'Nutuk', 
        author: 'Mustafa Kemal Atatürk', 
        price: 250.00, 
        coverImage: 'https://covers.openlibrary.org/b/id/12353937-L.jpg' 
      },
      { 
        title: 'Suç ve Ceza', 
        author: 'Fyodor Dostoyevski', 
        price: 195.00, 
        coverImage: 'https://covers.openlibrary.org/b/id/12353059-L.jpg' 
      },
      { 
        title: 'Benim Adım Kırmızı', 
        author: 'Orhan Pamuk', 
        price: 210.00, 
        coverImage: 'https://covers.openlibrary.org/b/id/12630674-L.jpg' 
      },
      { 
        title: 'Dune', 
        author: 'Frank Herbert', 
        price: 280.00, 
        coverImage: 'https://covers.openlibrary.org/b/id/15092781-L.jpg' 
      },
      { 
        title: 'Cesur Yeni Dünya', 
        author: 'Aldous Huxley', 
        price: 160.00, 
        coverImage: 'https://covers.openlibrary.org/b/id/11120906-L.jpg' 
      }
    ];

    await this.bookRepo.save(goldenBooks);
    
    // 3. Demo için rastgele satış verileri oluştur (Son 4 ay)
    const fakeOrders: Order[] = [];
    for (let i = 0; i < 20; i++) {
        const order = new Order();
        const monthsBack = Math.floor(Math.random() * 4); 
        const date = new Date();
        date.setMonth(date.getMonth() - monthsBack);
        date.setDate(Math.floor(Math.random() * 28) + 1);
        
        order.totalPrice = parseFloat((Math.random() * 500 + 50).toFixed(2));
        order.createdAt = date;
        fakeOrders.push(order);
    }
    
    await this.orderRepo.save(fakeOrders);

    return { 
        status: 'Success',
        message: 'Sistem temizlendi ve gerçekçi Golden State verileri yüklendi.',
        timestamp: new Date().toISOString()
    };
  }

  async seedLargeData() {
    // Geliştirme aşamasını yansıtan "test" verileri
    const testTitles = [
      "Deneme Kitap asdasd", 
      "Test Verisi 123", 
      "Çalışıyor mu bu?", 
      "Backend Test Kitabı", 
      "asdasdasd", 
      "Yeni Kitap (Final Test)", 
      "Sistemi Dene 1", 
      "Mock Data - Kitap", 
      "Test Başlığı", 
      "Kamyonet Test Girişi"
    ];

    const testAuthors = [
      "Test Yazarı", 
      "Admin Test", 
      "asd Yazar", 
      "Geliştirici", 
      "Sistem Testi", 
      "Kullanıcı Deneme"
    ];
    
    const coverIds = [8231856, 240727, 10527843, 10523338, 11153231, 10521270, 11115768, 10526023];
    const bulkBooks: any = [];

    for (let i = 0; i < 100; i++) {
      const randomTitle = testTitles[Math.floor(Math.random() * testTitles.length)];
      const randomAuthor = testAuthors[Math.floor(Math.random() * testAuthors.length)];
      
      bulkBooks.push({
        title: `${randomTitle}`,
        author: randomAuthor,
        coverImage: `https://covers.openlibrary.org/b/id/${coverIds[Math.floor(Math.random() * coverIds.length)]}-L.jpg`,
        price: Math.floor(Math.random() * (500 - 50) + 50) 
      });
    }

    // Bu satırlar artık metodun içinde
    await this.bookRepo.save(bulkBooks);
    
    return {
      status: 'Success',
      message: '100 adet test verisi başarıyla oluşturuldu.',
      count: 100
    };
  }
}