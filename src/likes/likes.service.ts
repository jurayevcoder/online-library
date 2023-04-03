import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
import { Book } from '../books/models/book.model';
import { User } from '../users/models/user.model';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './models/like.model';

@Injectable()
export class LikesService {
    constructor(@InjectModel(Like) private likeRepo: typeof Like, 
    @InjectModel(Book) private bookRepo: typeof Book,
    @InjectModel(User) private userRepo: typeof User
    ) { }

    async createLike(createLikeDto: CreateLikeDto): Promise<Like> {
        const user = await this.userRepo.findOne({where: {id: createLikeDto.user_id}});
        const book = await this.bookRepo.findOne({ where: { id: createLikeDto.book_id } })
        const like = await this.likeRepo.findOne({ where: { book_id: createLikeDto.book_id } });
        let response:any
        if (!user){
            throw new BadRequestException('No such user found');
        }
        if (!book) {
            throw new BadRequestException('No such book found');
        }
        if (!like) {
            await this.likeRepo.create({
                ...createLikeDto,
                like_number: 1,
            });
            response = {
                message: "Thanks for the like",
            };
        }
        if (like){
            if (like.user_id !== createLikeDto.user_id){
                const updatedLike = await this.likeRepo.update(
                    { like_number: like.like_number + 1, user_id: createLikeDto.user_id },
                    { where: { book_id: like.book_id }, returning: true }
                );
                response = {
                    message: "👍🏻",
                    like: updatedLike[1][0]
                };
            }
            if (like.user_id == createLikeDto.user_id){
                const updatedLike = await this.likeRepo.update(
                    { like_number: like.like_number - 1, user_id: 0 },
                    { where: { book_id: like.book_id }, returning: true }
                );
                response = {
                    message: "😡",
                    like: updatedLike[1][0]
                };
            }
        }
        return response;
    }

    
    async getAllLike() {
        const likeies = await this.likeRepo.findAll({ include: { all: true } });
        return likeies;
    }

    async getOneLike(id: number): Promise<Like> {
        const like = await this.likeRepo.findByPk(id);
        return like;
    }

    async delOneLike(id: number) {
        return this.likeRepo.destroy({ where: { id } });
    }

    async updateLike(id: number, updateLikeDto: UpdateLikeDto) {
        const like = await this.likeRepo.update(updateLikeDto, {
            where: { id },
        })
    }
}
