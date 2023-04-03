import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './models/like.model';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like) private likeRepo: typeof Like) {}

    async createLike(createLikeDto: CreateLikeDto): Promise<Like> {
        const like = await this.likeRepo.create(createLikeDto);
        return like;
    }

    async getAllLike(){
        const likeies = await this.likeRepo.findAll({include: {all: true}});
        return likeies;
    }

    async getOneLike(id: number): Promise<Like>{
        const like = await this.likeRepo.findByPk(id);
        return like;
    }

    async delOneLike(id: number){
        return this.likeRepo.destroy({where: {id}});
    }

    async updateLike(id: number, updateLikeDto: UpdateLikeDto){
        const like = await this.likeRepo.update(updateLikeDto,{
            where: {id},
        })
    }
}
