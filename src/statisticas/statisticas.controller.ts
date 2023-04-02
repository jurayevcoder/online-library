import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatisticasService } from './statisticas.service';
import { CreateStatisticaDto } from './dto/create-statistica.dto';
import { UpdateStatisticaDto } from './dto/update-statistica.dto';

@Controller('statisticas')
export class StatisticasController {
  constructor(private readonly statisticasService: StatisticasService) {}

  @Post()
  create(@Body() createStatisticaDto: CreateStatisticaDto) {
    return this.statisticasService.create(createStatisticaDto);
  }

  @Get()
  findAll() {
    return this.statisticasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statisticasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatisticaDto: UpdateStatisticaDto) {
    return this.statisticasService.update(+id, updateStatisticaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statisticasService.remove(+id);
  }
}
