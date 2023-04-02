import { Injectable } from '@nestjs/common';
import { CreateBookPaymentDto } from './dto/create-book_payment.dto';
import { UpdateBookPaymentDto } from './dto/update-book_payment.dto';

@Injectable()
export class BookPaymentsService {
  create(createBookPaymentDto: CreateBookPaymentDto) {
    return 'This action adds a new bookPayment';
  }

  findAll() {
    return `This action returns all bookPayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookPayment`;
  }

  update(id: number, updateBookPaymentDto: UpdateBookPaymentDto) {
    return `This action updates a #${id} bookPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookPayment`;
  }
}
