import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookImagesService } from './book_images.service';
import { CreateBookImageDto } from './dto/create-book_image.dto';
import { UpdateBookImageDto } from './dto/update-book_image.dto';
import { BookImage } from './models/book_image.model';

@ApiTags('Kitob Rasmlari')
@Controller('book-images')
export class BookImagesController {
  constructor(private readonly bookImagesService: BookImagesService) {}

  @ApiOperation({ summary: "Kitob rasmini yaratish" })
  @Post("create")
  async createBookImage(@Body() createBookImageDto: CreateBookImageDto): Promise<BookImage> {
    return this.bookImagesService.createBookImage(createBookImageDto);
  }

  @ApiOperation({ summary: "Kitob rasmlarni ko'rish " })
  @Get('find-all')
  async getAllBookImage() {
    return this.bookImagesService.getAllBookImage();
  }

  @ApiOperation({ summary: "Kitob rasmini ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneBookImage(@Param("id") id: string): Promise<BookImage> {
    return this.bookImagesService.getOneBookImage(+id);
  }

  @ApiOperation({ summary: "Kitob rasmini ID si bo'yicha o'chirish" })
  @Delete('delete/:id')
  async delOneBookImage(@Param("id") id: string) {
    return this.bookImagesService.delOneBookImage(+id);
  }

  @ApiOperation({ summary: "Kitob rasmini ID si bo'yicha o'zgartirish" })
  @Put("update/:id")
  async updateBookImage(@Param('id') id: string, @Body() updateBookImageDto: UpdateBookImageDto) {
    return this.bookImagesService.updateBookImage(+id, updateBookImageDto);
  }
}
