import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Advertisement } from './models/advertisement.model';
import { Statistica } from '../statistica/models/statistica.model';

@Injectable()
export class AdvertisementsService {
    constructor(
        @InjectModel(Advertisement) private advertisementRepo: typeof Advertisement,
        @InjectModel(Statistica) private statisticaRepo: typeof Statistica
    ) { }

    async createAdvertisement(createAdvertisementDto: CreateAdvertisementDto): Promise<Advertisement> {
        const advertisement = await this.advertisementRepo.create(createAdvertisementDto);
        const statistica = await this.statisticaRepo.findOne({ where: { id: 1 } })

        if (statistica) {
            await this.statisticaRepo.update(
                { total_number_of_ads: statistica.total_number_of_ads + 1, },
                { where: { id: 1 }, returning: true }
            )
        }
        return advertisement;
    }

    async getAllAdvertisement() {
        const advertisementies = await this.advertisementRepo.findAll({ include: { all: true } });
        return advertisementies;
    }

    async getOneAdvertisement(id: number): Promise<Advertisement> {
        const advertisement = await this.advertisementRepo.findByPk(id);
        return advertisement;
    }

    async delOneAdvertisement(id: number) {
        return this.advertisementRepo.destroy({ where: { id } });
    }

    async updateAdvertisement(id: number, updateAdvertisementDto: UpdateAdvertisementDto) {
        const advertisement = await this.advertisementRepo.update(updateAdvertisementDto, {
            where: { id },
        })
    }
}
