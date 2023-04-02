import { Module } from '@nestjs/common';
import { BookImagesService } from './book_images.service';
import { BookImagesController } from './book_images.controller';

@Module({
  controllers: [BookImagesController],
  providers: [BookImagesService]
})
export class BookImagesModule {}
