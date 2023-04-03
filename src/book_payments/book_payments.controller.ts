import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookPaymentsService } from './book_payments.service';
import { CreateBookPaymentDto } from './dto/create-book_payment.dto';
import { UpdateBookPaymentDto } from './dto/update-book_payment.dto';
import { BookPayment } from './models/book_payment.model';

@ApiTags("Kitob Olish Turlari")
@Controller('book-payments')
export class BookPaymentsController {
  constructor(private readonly bookPaymentsService: BookPaymentsService) {}

  @ApiOperation({ summary: "Kitobni olishlarni yaratish" })
  @Post("create")
  async createBookPayment(@Body() createBookPaymentDto: CreateBookPaymentDto): Promise<BookPayment> {
    return this.bookPaymentsService.createBookPayment(createBookPaymentDto);
  }

  @ApiOperation({ summary: "Kitobni olishlarni ko'rish " })
  @Get('find-all')
  async getAllBookPayment() {
    return this.bookPaymentsService.getAllBookPayment();
  }

  @ApiOperation({ summary: "Kitobni olishni ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneBookPayment(@Param("id") id: string): Promise<BookPayment> {
    return this.bookPaymentsService.getOneBookPayment(+id);
  }

  @ApiOperation({ summary: "Kitobni olishni ID si bo'yicha o'chirish" })
  @Delete('delete/:id')
  async delOneBookPayment(@Param("id") id: string) {
    return this.bookPaymentsService.delOneBookPayment(+id);
  }

  @ApiOperation({ summary: "Kitobni olishni ID si bo'yicha o'zgartirish" })
  @Put("update/:id")
  async updateBookPayment(@Param('id') id: string, @Body() updateBookPaymentDto: UpdateBookPaymentDto) {
    return this.bookPaymentsService.updateBookPayment(+id, updateBookPaymentDto);
  }
}
