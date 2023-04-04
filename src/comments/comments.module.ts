import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { Book } from '../books/models/book.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment, Book])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
