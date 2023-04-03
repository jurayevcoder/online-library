import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatisticaService } from './statistica.service';
import { CreateStatisticaDto } from './dto/create-statistica.dto';
import { UpdateStatisticaDto } from './dto/update-statistica.dto';

@Controller('statistica')
export class StatisticaController {
  constructor(private readonly statisticaService: StatisticaService) {}

  @Post()
  create(@Body() createStatisticaDto: CreateStatisticaDto) {
    return this.statisticaService.create(createStatisticaDto);
  }

  @Get()
  findAll() {
    return this.statisticaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statisticaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatisticaDto: UpdateStatisticaDto) {
    return this.statisticaService.update(+id, updateStatisticaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statisticaService.remove(+id);
  }
}
