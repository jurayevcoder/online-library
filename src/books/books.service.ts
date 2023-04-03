import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './models/book.model';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book) private bookRepo: typeof Book) {}

    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const book = await this.bookRepo.create(createBookDto);
        return book;
    }

    async getAllBook(){
        const bookies = await this.bookRepo.findAll({include: {all: true}});
        return bookies;
    }

    async getOneBook(id: number): Promise<Book>{
        const book = await this.bookRepo.findByPk(id);
        return book;
    }

    async delOneBook(id: number){
        return this.bookRepo.destroy({where: {id}});
    }

    async updateBook(id: number, updateBookDto: UpdateBookDto){
        const book = await this.bookRepo.update(updateBookDto,{
            where: {id},
        })
    }
}
