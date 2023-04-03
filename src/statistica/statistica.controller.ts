import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StatisticaService } from './statistica.service';
import { CreateStatisticaDto } from './dto/create-statistica.dto';
import { UpdateStatisticaDto } from './dto/update-statistica.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Statistica } from './models/statistica.model';

@Controller('statistica')
export class StatisticaController {
  constructor(private readonly statisticaService: StatisticaService) {}

  @ApiOperation({ summary: "Statistica yaratish" })
  @Post("create")
  async createStatistica(@Body() createStatisticaDto: CreateStatisticaDto): Promise<Statistica> {
    return this.statisticaService.createStatistica(createStatisticaDto);
  }

  @ApiOperation({ summary: "Statisticalarni ko'rish " })
  @Get('find-all')
  async getAllStatistica() {
    return this.statisticaService.getAllStatistica();
  }

  @ApiOperation({ summary: "Statisticani ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneStatistica(@Param("id") id: string): Promise<Statistica> {
    return this.statisticaService.getOneStatistica(+id);
  }

  @ApiOperation({ summary: "Statisticani ID si bo'yicha o'chirish" })
  @Delete('delete/:id')
  async delOneStatistica(@Param("id") id: string) {
    return this.statisticaService.delOneStatistica(+id);
  }

  @ApiOperation({ summary: "Statisticani ID si bo'yicha o'zgartirish" })
  @Put("update/:id")
  async updateStatistica(@Param('id') id: string, @Body() updateStatisticaDto: UpdateStatisticaDto) {
    return this.statisticaService.updateStatistica(+id, updateStatisticaDto);
  }
}
