import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { Statistica } from '../statistica/models/statistica.model';

@Module({
  imports: [SequelizeModule.forFeature([Book, Statistica])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
