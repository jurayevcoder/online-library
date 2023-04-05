import { Module } from '@nestjs/common';
import { StatisticaService } from './statistica.service';
import { StatisticaController } from './statistica.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Statistica } from './models/statistica.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Statistica]), JwtModule],
  controllers: [StatisticaController],
  providers: [StatisticaService]
})
export class StatisticaModule {}
