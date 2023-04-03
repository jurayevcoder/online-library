import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookPaymentDto } from './dto/create-book_payment.dto';
import { UpdateBookPaymentDto } from './dto/update-book_payment.dto';
import { BookPayment } from './models/book_payment.model';

@Injectable()
export class BookPaymentsService {
  constructor(@InjectModel(BookPayment) private bookPaymentRepo: typeof BookPayment) {}

    async createBookPayment(createBookPaymentDto: CreateBookPaymentDto): Promise<BookPayment> {
        const book_payment = await this.bookPaymentRepo.create(createBookPaymentDto);
        return book_payment;
    }

    async getAllBookPayment(){
        const book_paymenties = await this.bookPaymentRepo.findAll({include: {all: true}});
        return book_paymenties;
    }

    async getOneBookPayment(id: number): Promise<BookPayment>{
        const book_payment = await this.bookPaymentRepo.findByPk(id);
        return book_payment;
    }

    async delOneBookPayment(id: number){
        return this.bookPaymentRepo.destroy({where: {id}});
    }

    async updateBookPayment(id: number, updateBookPaymentDto: UpdateBookPaymentDto){
        const book_payment = await this.bookPaymentRepo.update(updateBookPaymentDto,{
            where: {id},
        })
    }
}
