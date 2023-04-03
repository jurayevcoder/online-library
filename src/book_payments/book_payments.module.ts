import { Module } from '@nestjs/common';
import { BookPaymentsService } from './book_payments.service';
import { BookPaymentsController } from './book_payments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookPayment } from './models/book_payment.model';

@Module({
  imports: [SequelizeModule.forFeature([BookPayment])],
  controllers: [BookPaymentsController],
  providers: [BookPaymentsService]
})
export class BookPaymentsModule {}
