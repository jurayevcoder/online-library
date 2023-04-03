import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './models/book.model';


@ApiTags("Kitoblar")
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @ApiOperation({ summary: "Book yaratish" })
  @Post("create")
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @ApiOperation({ summary: "Booklarni ko'rish " })
  @Get('find-all')
  async getAllBook() {
    return this.booksService.getAllBook();
  }

  @ApiOperation({ summary: "Bookni ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneBook(@Param("id") id: string): Promise<Book> {
    return this.booksService.getOneBook(+id);
  }

  @ApiOperation({ summary: "Bookni ID si bo'yicha o'chirish" })
  @Delete('delete/:id')
  async delOneBook(@Param("id") id: string) {
    return this.booksService.delOneBook(+id);
  }

  @ApiOperation({ summary: "Bookni ID si bo'yicha o'zgartirish" })
  @Put("update/:id")
  async updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(+id, updateBookDto);
  }
}
