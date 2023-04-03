import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './models/like.model';
import { Book } from '../books/models/book.model';
import { User } from '../users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Like, Book, User])],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule {}
