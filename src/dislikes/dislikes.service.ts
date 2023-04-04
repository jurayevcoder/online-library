import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../books/models/book.model';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { UpdateDislikeDto } from './dto/update-dislike.dto';
import { Dislike } from './models/dislike.model';

@Injectable()
export class DislikesService {
    constructor(
        @InjectModel(Dislike) private dislikeRepo: typeof Dislike,
        @InjectModel(Book) private bookRepo: typeof Book,
    ) { }

    async createDislike(createDislikeDto: CreateDislikeDto): Promise<Dislike> {
        const user = await this.dislikeRepo.findOne({ where: { user_id: createDislikeDto.user_id, book_id: createDislikeDto.book_id } });
        const book = await this.bookRepo.findOne({ where: { id: createDislikeDto.book_id } })
        let response: any
        if (!book) {
            throw new BadRequestException('No such book found');
        }
        if (!user) {
            await this.dislikeRepo.create({
                ...createDislikeDto,
                dislike_number: 1,
            });
            response = {
                message: "😡",
            };
        }
        if (user) {
            await this.dislikeRepo.destroy({ where: { user_id: createDislikeDto.user_id, book_id: createDislikeDto.book_id } })
            response = {
                message: "Thanks 👍🏻"
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
