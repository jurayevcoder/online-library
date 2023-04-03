import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookImageDto } from './dto/create-book_image.dto';
import { UpdateBookImageDto } from './dto/update-book_image.dto';
import { BookImage } from './models/book_image.model';

@Injectable()
export class BookImagesService {
    constructor(@InjectModel(BookImage) private BookImageRepo: typeof BookImage) { }

    async createBookImage(createBookImageDto: CreateBookImageDto): Promise<BookImage> {
        const book_image = await this.BookImageRepo.create(createBookImageDto);
        return book_image;
    }

    async getAllBookImage() {
        const book_imageies = await this.BookImageRepo.findAll({ include: { all: true } });
        return book_imageies;
    }

    async getOneBookImage(id: number): Promise<BookImage> {
        const book_image = await this.BookImageRepo.findByPk(id);
        return book_image;
    }

    async delOneBookImage(id: number) {
        return this.BookImageRepo.destroy({ where: { id } });
    }

    async updateBookImage(id: number, updateBookImageDto: UpdateBookImageDto) {
        const book_image = await this.BookImageRepo.update(updateBookImageDto, {
            where: { id },
        })
    }
}
