import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatisticaDto } from './dto/create-statistica.dto';
import { UpdateStatisticaDto } from './dto/update-statistica.dto';
import { Statistica } from './models/statistica.model';

@Injectable()
export class StatisticaService {
  constructor(@InjectModel(Statistica) private StatisticaRepo: typeof Statistica) {}

    async createStatistica(createStatisticaDto: CreateStatisticaDto): Promise<Statistica> {
        const statistica = await this.StatisticaRepo.create(createStatisticaDto);
        return statistica;
    }

    async getAllStatistica(){
        const statisticaies = await this.StatisticaRepo.findAll({include: {all: true}});
        return statisticaies;
    }

    async getOneStatistica(id: number): Promise<Statistica>{
        const statistica = await this.StatisticaRepo.findByPk(id);
        return statistica;
    }

    async delOneStatistica(id: number){
        return this.StatisticaRepo.destroy({where: {id}});
    }

    async updateStatistica(id: number, updateStatisticaDto: UpdateStatisticaDto){
        const statistica = await this.StatisticaRepo.update(updateStatisticaDto,{
            where: {id},
        })
    }
}
