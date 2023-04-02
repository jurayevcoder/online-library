import { Module } from '@nestjs/common';
import { BookPaymentsService } from './book_payments.service';
import { BookPaymentsController } from './book_payments.controller';

@Module({
  controllers: [BookPaymentsController],
  providers: [BookPaymentsService]
})
export class BookPaymentsModule {}
