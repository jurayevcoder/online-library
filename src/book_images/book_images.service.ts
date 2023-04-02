import { Injectable } from '@nestjs/common';
import { CreateBookImageDto } from './dto/create-book_image.dto';
import { UpdateBookImageDto } from './dto/update-book_image.dto';

@Injectable()
export class BookImagesService {
  create(createBookImageDto: CreateBookImageDto) {
    return 'This action adds a new bookImage';
  }

  findAll() {
    return `This action returns all bookImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookImage`;
  }

  update(id: number, updateBookImageDto: UpdateBookImageDto) {
    return `This action updates a #${id} bookImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookImage`;
  }
}
