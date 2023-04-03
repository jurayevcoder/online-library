import { Module } from '@nestjs/common';
import { BookImagesService } from './book_images.service';
import { BookImagesController } from './book_images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookImage } from './models/book_image.model';

@Module({
  imports: [SequelizeModule.forFeature([BookImage])],
  controllers: [BookImagesController],
  providers: [BookImagesService]
})
export class BookImagesModule {}
