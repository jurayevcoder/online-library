import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookPaymentsService } from './book_payments.service';
import { CreateBookPaymentDto } from './dto/create-book_payment.dto';
import { UpdateBookPaymentDto } from './dto/update-book_payment.dto';

@Controller('book-payments')
export class BookPaymentsController {
  constructor(private readonly bookPaymentsService: BookPaymentsService) {}

  @Post()
  create(@Body() createBookPaymentDto: CreateBookPaymentDto) {
    return this.bookPaymentsService.create(createBookPaymentDto);
  }

  @Get()
  findAll() {
    return this.bookPaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookPaymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookPaymentDto: UpdateBookPaymentDto) {
    return this.bookPaymentsService.update(+id, updateBookPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookPaymentsService.remove(+id);
  }
}
