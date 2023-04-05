import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { StatisticaService } from './statistica.service';
import { CreateStatisticaDto } from './dto/create-statistica.dto';
import { UpdateStatisticaDto } from './dto/update-statistica.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Statistica } from './models/statistica.model';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('statistica')
export class StatisticaController {
  constructor(private readonly statisticaService: StatisticaService) {}

  @ApiOperation({ summary: "Statisticalarni ko'rish " })
  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllStatistica() {
    return this.statisticaService.getAllStatistica();
  }

  @ApiOperation({ summary: "Statisticani ID si bo'yicha o'chirish" })
  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneStatistica(@Param("id") id: string): Promise<number> {
    return this.statisticaService.delOneStatistica(+id);
  }
}