import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookPaymentsService } from './book_payments.service';
import { CreateBookPaymentDto } from './dto/create-book_payment.dto';
import { UpdateBookPaymentDto } from './dto/update-book_payment.dto';
import { BookPayment } from './models/book_payment.model';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth-decorator';

@ApiTags("Kitob Olish Turlari")
@Controller('book-payments')
export class BookPaymentsController {
  constructor(private readonly bookPaymentsService: BookPaymentsService) {}

  @ApiOperation({ summary: "Kitobni olishlarni yaratish" })
  @Post("create")
  @Roles("SUPERADMIN", "ADMIN", "USER")
  @UseGuards(RolesGuard)
  async createBookPayment(@Body() createBookPaymentDto: CreateBookPaymentDto): Promise<BookPayment> {
    return this.bookPaymentsService.createBookPayment(createBookPaymentDto);
  }

  @ApiOperation({ summary: "Kitobni olishlarni ko'rish " })
  @Roles("SUPERADMIN", "ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllBookPayment() {
    return this.bookPaymentsService.getAllBookPayment();
  }

  @ApiOperation({ summary: "Kitobni olishni ID si bo'yicha ko'rish" })
  @Roles("SUPERADMIN", "ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async getOneBookPayment(@Param("id") id: string): Promise<BookPayment> {
    return this.bookPaymentsService.getOneBookPayment(+id);
  }

  @ApiOperation({ summary: "Kitobni olishni ID si bo'yicha o'chirish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneBookPayment(@Param("id") id: string) {
    return this.bookPaymentsService.delOneBookPayment(+id);
  }

  @ApiOperation({ summary: "Kitobni olishni ID si bo'yicha o'zgartirish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Put("update/:id")
  async updateBookPayment(@Param('id') id: string, @Body() updateBookPaymentDto: UpdateBookPaymentDto) {
    return this.bookPaymentsService.updateBookPayment(+id, updateBookPaymentDto);
  }
}
