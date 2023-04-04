import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './models/like.model';
import { Book } from '../books/models/book.model';


@Module({
  imports: [SequelizeModule.forFeature([Like, Book])],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule {}
