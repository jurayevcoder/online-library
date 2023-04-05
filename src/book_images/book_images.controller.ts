import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookImagesService } from './book_images.service';
import { CreateBookImageDto } from './dto/create-book_image.dto';
import { UpdateBookImageDto } from './dto/update-book_image.dto';
import { BookImage } from './models/book_image.model';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Kitob Rasmlari')
@Controller('book-images')
export class BookImagesController {
  constructor(private readonly bookImagesService: BookImagesService) {}

  @ApiOperation({ summary: "Kitob rasmini yaratish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Post("create")
  async createBookImage(@Body() createBookImageDto: CreateBookImageDto): Promise<BookImage> {
    return this.bookImagesService.createBookImage(createBookImageDto);
  }

  @ApiOperation({ summary: "Kitob rasmlarni ko'rish " })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllBookImage() {
    return this.bookImagesService.getAllBookImage();
  }

  @ApiOperation({ summary: "Kitob rasmini ID si bo'yicha ko'rish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async getOneBookImage(@Param("id") id: string): Promise<BookImage> {
    return this.bookImagesService.getOneBookImage(+id);
  }

  @ApiOperation({ summary: "Kitob rasmini ID si bo'yicha o'chirish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneBookImage(@Param("id") id: string) {
    return this.bookImagesService.delOneBookImage(+id);
  }

  @ApiOperation({ summary: "Kitob rasmini ID si bo'yicha o'zgartirish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Put("update/:id")
  async updateBookImage(@Param('id') id: string, @Body() updateBookImageDto: UpdateBookImageDto) {
    return this.bookImagesService.updateBookImage(+id, updateBookImageDto);
  }
}
