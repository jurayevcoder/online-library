import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './models/author.model';


@ApiTags("Kitob Mualiflari")
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: "Mualif yaratish" })
  @Post("create")
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @ApiOperation({ summary: "Mualiflarni ko'rish " })
  @Get('find-all')
  async getAllAuthor() {
    return this.authorsService.getAllAuthor();
  }

  @ApiOperation({ summary: "Mualifni ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneAuthor(@Param("id") id: string): Promise<Author> {
    return this.authorsService.getOneAuthor(+id);
  }

  @ApiOperation({ summary: "Mualifni ID si bo'yicha o'chirish" })
  @Delete('delete/:id')
  async delOneAuthor(@Param("id") id: string) {
    return this.authorsService.delOneAuthor(+id);
  }

  @ApiOperation({ summary: "Mualifni ID si bo'yicha o'zgartirish" })
  @Put("update/:id")
  async updateAuthor(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.updateAuthor(+id, updateAuthorDto);
  }
}
