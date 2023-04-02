import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookImagesService } from './book_images.service';
import { CreateBookImageDto } from './dto/create-book_image.dto';
import { UpdateBookImageDto } from './dto/update-book_image.dto';

@Controller('book-images')
export class BookImagesController {
  constructor(private readonly bookImagesService: BookImagesService) {}

  @Post()
  create(@Body() createBookImageDto: CreateBookImageDto) {
    return this.bookImagesService.create(createBookImageDto);
  }

  @Get()
  findAll() {
    return this.bookImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookImageDto: UpdateBookImageDto) {
    return this.bookImagesService.update(+id, updateBookImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookImagesService.remove(+id);
  }
}
