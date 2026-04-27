// backend/src/books/books.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
  ) {}

  findAll() { return this.bookRepo.find(); }

  create(bookData: Partial<Book>) {
    const book = this.bookRepo.create(bookData);
    return this.bookRepo.save(book);
  }

  async remove(id: number) {
    await this.bookRepo.delete(id);
    return { message: 'Kitap silindi' };
  }

  // backend/src/books/books.service.ts

  async update(id: number, updateData: any) {
    await this.bookRepo.update(id, updateData);
    return this.bookRepo.findOne({ where: { id: Number(id) } });
}
}