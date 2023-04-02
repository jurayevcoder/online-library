import { PartialType } from '@nestjs/swagger';
import { CreateBookPaymentDto } from './create-book_payment.dto';

export class UpdateBookPaymentDto extends PartialType(CreateBookPaymentDto) {}
