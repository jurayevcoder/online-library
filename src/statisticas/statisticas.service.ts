import { Injectable } from '@nestjs/common';
import { CreateStatisticaDto } from './dto/create-statistica.dto';
import { UpdateStatisticaDto } from './dto/update-statistica.dto';

@Injectable()
export class StatisticasService {
  create(createStatisticaDto: CreateStatisticaDto) {
    return 'This action adds a new statistica';
  }

  findAll() {
    return `This action returns all statisticas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statistica`;
  }

  update(id: number, updateStatisticaDto: UpdateStatisticaDto) {
    return `This action updates a #${id} statistica`;
  }

  remove(id: number) {
    return `This action removes a #${id} statistica`;
  }
}
