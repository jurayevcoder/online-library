import { Module } from '@nestjs/common';
import { StatisticasService } from './statisticas.service';
import { StatisticasController } from './statisticas.controller';

@Module({
  controllers: [StatisticasController],
  providers: [StatisticasService]
})
export class StatisticasModule {}
