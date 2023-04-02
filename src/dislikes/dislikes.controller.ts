import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DislikesService } from './dislikes.service';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { UpdateDislikeDto } from './dto/update-dislike.dto';

@Controller('dislikes')
export class DislikesController {
  constructor(private readonly dislikesService: DislikesService) {}

  @Post()
  create(@Body() createDislikeDto: CreateDislikeDto) {
    return this.dislikesService.create(createDislikeDto);
  }

  @Get()
  findAll() {
    return this.dislikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dislikesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDislikeDto: UpdateDislikeDto) {
    return this.dislikesService.update(+id, updateDislikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dislikesService.remove(+id);
  }
}
