import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './models/book.model';
import { Statistica } from '../statistica/models/statistica.model';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book) private bookRepo: typeof Book,
        @InjectModel(Statistica) private statisticaRepo: typeof Statistica
    ) { }

    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        let response: any
        const book = await this.bookRepo.findOne({ where: { name: createBookDto.name, author_id: createBookDto.author_id, e_book: createBookDto.e_book } })
        if (book) {
            throw new BadRequestException("The book is already available!")
        }
        else {
            const newBook = await this.bookRepo.create({ ...createBookDto })
            response = {
                messages: "Book added successfully!",
            }
            const statistica = await this.statisticaRepo.findOne({ where: { id: 1 } })

            if (statistica) {
                await this.statisticaRepo.update(
                    { total_number_of_books: statistica.total_number_of_books + 1, },
                    { where: { id: 1 }, returning: true }
                )
            }
        }
        return response;
    }

    async getAllBook() {
        const bookies = await this.bookRepo.findAll();
        return bookies;
    }

    async getOneBook(id: number): Promise<Book> {
        const book = await this.bookRepo.findByPk(id);
        return book;
    }

    async delOneBook(id: number) {
        const statistica = await this.statisticaRepo.findOne({ where: { id: 1 } })
        if (statistica) {
            await this.statisticaRepo.update(
                { total_number_of_books: statistica.total_number_of_books - 1, },
                { where: { id: 1 }, returning: true }
            )
        }
        return this.bookRepo.destroy({ where: { id } });
    }

    async updateBook(id: number, updateBookDto: UpdateBookDto) {
        const book = await this.bookRepo.update(updateBookDto, {
            where: { id },
        })
    }
}
