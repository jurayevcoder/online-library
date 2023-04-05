import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Advertisement } from './models/advertisement.model';
import { Statistica } from '../statistica/models/statistica.model';

@Module({
  imports: [SequelizeModule.forFeature([Advertisement, Statistica])],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService]
})
export class AdvertisementsModule {}
