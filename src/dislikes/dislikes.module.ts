import { Module } from '@nestjs/common';
import { DislikesService } from './dislikes.service';
import { DislikesController } from './dislikes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dislike } from './models/dislike.model';
import { Book } from '../books/models/book.model';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [SequelizeModule.forFeature([Dislike, Book]), JwtModule],
  controllers: [DislikesController],
  providers: [DislikesService]
})
export class DislikesModule {}
