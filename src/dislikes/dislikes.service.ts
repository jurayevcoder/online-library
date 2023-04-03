import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../books/models/book.model';
import { User } from '../users/models/user.model';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { UpdateDislikeDto } from './dto/update-dislike.dto';
import { Dislike } from './models/dislike.model';

@Injectable()
export class DislikesService {
    constructor(
        @InjectModel(Dislike) private dislikeRepo: typeof Dislike,
        @InjectModel(Book) private bookRepo: typeof Book,
        @InjectModel(User) private userRepo: typeof User
    ) { }

    async createDislike(createDislikeDto: CreateDislikeDto): Promise<Dislike> {
        const user = await this.userRepo.findOne({ where: { id: createDislikeDto.user_id } });
        const book = await this.bookRepo.findOne({ where: { id: createDislikeDto.book_id } })
        const dislike = await this.dislikeRepo.findOne({ where: { book_id: createDislikeDto.book_id } });
        let response: any
        if (!user) {
            throw new BadRequestException('No such user found');
        }
        if (!book) {
            throw new BadRequestException('No such book found');
        }
        if (!dislike) {
            await this.dislikeRepo.create({
                ...createDislikeDto,
                dislike_number: 1,
            });
            response = {
                message: "Thanks for the like",
            };
        }
        if (dislike) {
            if (dislike.user_id !== createDislikeDto.user_id) {
                const updatedLike = await this.dislikeRepo.update(
                    { dislike_number: dislike.dislike_number + 1, user_id: createDislikeDto.user_id },
                    { where: { book_id: dislike.book_id }, returning: true }
                );
                response = {
                    message: "👎🏻",
                    like: updatedLike[1][0]
                };
            }
            if (dislike.user_id == createDislikeDto.user_id) {
                const updatedLike = await this.dislikeRepo.update(
                    { dislike_number: dislike.dislike_number - 1, user_id: 0 },
                    { where: { book_id: dislike.book_id }, returning: true }
                );
                response = {
                    message: "😊",
                    like: updatedLike[1][0]
                };
            }
        }
        return response;
    }

    async getAllDislike() {
        const dislikeies = await this.dislikeRepo.findAll({ include: { all: true } });
        return dislikeies;
    }

    async getOneDislike(id: number): Promise<Dislike> {
        const dislike = await this.dislikeRepo.findByPk(id);
        return dislike;
    }

    async delOneDislike(id: number) {
        return this.dislikeRepo.destroy({ where: { id } });
    }

    async updateDislike(id: number, updateDislikeDto: UpdateDislikeDto) {
        const dislike = await this.dislikeRepo.update(updateDislikeDto, {
            where: { id },
        })
    }
}
