import { Module } from '@nestjs/common';
import { StatisticaService } from './statistica.service';
import { StatisticaController } from './statistica.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Statistica } from './models/statistica.model';

@Module({
  imports: [SequelizeModule.forFeature([Statistica])],
  controllers: [StatisticaController],
  providers: [StatisticaService]
})
export class StatisticaModule {}
