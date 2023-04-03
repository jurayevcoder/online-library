import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DislikesService } from './dislikes.service';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { UpdateDislikeDto } from './dto/update-dislike.dto';
import { Dislike } from './models/dislike.model';

@ApiTags("Dislayklar")
@Controller('dislikes')
export class DislikesController {
  constructor(private readonly dislikesService: DislikesService) {}

  @ApiOperation({ summary: "Dislayk bosish" })
  @Post("dislike")
  async createDislike(@Body() createDislikeDto: CreateDislikeDto): Promise<Dislike> {
    return this.dislikesService.createDislike(createDislikeDto);
  }

  @ApiOperation({ summary: "Dislayklarni ko'rish " })
  @Get('find-all')
  async getAllDislike() {
    return this.dislikesService.getAllDislike();
  }

  @ApiOperation({ summary: "Dislaykni ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneDislike(@Param("id") id: string): Promise<Dislike> {
    return this.dislikesService.getOneDislike(+id);
  }

  @ApiOperation({ summary: "Dislaykni ID si bo'yicha o'chirish" })
  @Delete('delete/:id')
  async delOneDislike(@Param("id") id: string) {
    return this.dislikesService.delOneDislike(+id);
  }

  @ApiOperation({ summary: "Dislaykni ID si bo'yicha o'zgartirish" })
  @Put("update/:id")
  async updateDislike(@Param('id') id: string, @Body() updateDislikeDto: UpdateDislikeDto) {
    return this.dislikesService.updateDislike(+id, updateDislikeDto);
  }
}
