import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentRepo: typeof Comment) {}

    async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = await this.commentRepo.create(createCommentDto);
        return comment;
    }

    async getAllComment(){
        const commenties = await this.commentRepo.findAll({include: {all: true}});
        return commenties;
    }

    async getOneComment(id: number): Promise<Comment>{
        const comment = await this.commentRepo.findByPk(id);
        return comment;
    }

    async delOneComment(id: number){
        return this.commentRepo.destroy({where: {id}});
    }

    async updateComment(id: number, updateCommentDto: UpdateCommentDto){
        const comment = await this.commentRepo.update(updateCommentDto,{
            where: {id},
        })
    }
}
