// backend/src/books/books.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Body, 
  Param 
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll() { 
    return this.booksService.findAll(); 
  }

  @Post()
  async createBook(@Body() bookData: { title: string, author: string, price: number, coverImage?: string }) {
    return this.booksService.create(bookData);
}

  @Delete(':id')
  remove(@Param('id') id: number) { 
    return this.booksService.remove(id); 
  }
}