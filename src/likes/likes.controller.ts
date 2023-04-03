import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Like } from './models/like.model';

@ApiTags("Layklar")
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({ summary: "Layk bosish" })
  @Post("like")
  async createLike(@Body() createLikeDto: CreateLikeDto): Promise<Like> {
    return this.likesService.createLike(createLikeDto);
  }

  @ApiOperation({ summary: "Layklarni ko'rish " })
  @Get('find-all')
  async getAllLike() {
    return this.likesService.getAllLike();
  }

  @ApiOperation({ summary: "Laykni ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneLike(@Param("id") id: string): Promise<Like> {
    return this.likesService.getOneLike(+id);
  }

  @ApiOperation({ summary: "Laykni ID si bo'yicha o'chirish" })
  @Delete('delete/:id')
  async delOneLike(@Param("id") id: string) {
    return this.likesService.delOneLike(+id);
  }

  @ApiOperation({ summary: "Laykni ID si bo'yicha o'zgartirish" })
  @Put("update/:id")
  async updateLike(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.updateLike(+id, updateLikeDto);
  }
}
