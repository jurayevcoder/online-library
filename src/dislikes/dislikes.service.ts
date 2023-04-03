import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { UpdateDislikeDto } from './dto/update-dislike.dto';
import { Dislike } from './models/dislike.model';

@Injectable()
export class DislikesService {
  constructor(@InjectModel(Dislike) private dislikeRepo: typeof Dislike) {}

    async createDislike(createDislikeDto: CreateDislikeDto): Promise<Dislike> {
        const dislike = await this.dislikeRepo.create(createDislikeDto);
        return dislike;
    }

    async getAllDislike(){
        const dislikeies = await this.dislikeRepo.findAll({include: {all: true}});
        return dislikeies;
    }

    async getOneDislike(id: number): Promise<Dislike>{
        const dislike = await this.dislikeRepo.findByPk(id);
        return dislike;
    }

    async delOneDislike(id: number){
        return this.dislikeRepo.destroy({where: {id}});
    }

    async updateDislike(id: number, updateDislikeDto: UpdateDislikeDto){
        const dislike = await this.dislikeRepo.update(updateDislikeDto,{
            where: {id},
        })
    }
}
