import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../books/models/book.model';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './models/like.model';

@Injectable()
export class LikesService {
    constructor(@InjectModel(Like) private likeRepo: typeof Like,
        @InjectModel(Book) private bookRepo: typeof Book,
    ) { }

    async createLike(createLikeDto: CreateLikeDto): Promise<Like> {
        const user = await this.likeRepo.findOne({ where: { user_id: createLikeDto.user_id, book_id: createLikeDto.book_id } });
        const book = await this.bookRepo.findOne({ where: { id: createLikeDto.book_id } })
        let response: any
        if (!book) {
            throw new BadRequestException('No such book found');
        }
        if (!user) {
            await this.likeRepo.create({
                ...createLikeDto,
                like_number: 1,
            });
            response = {
                message: "Thanks for the like 👍🏻",
            };
        }
        if (user) {
            await this.likeRepo.destroy({ where: { user_id: createLikeDto.user_id, book_id: createLikeDto.book_id } })
            response = {
                message: "😡"
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
