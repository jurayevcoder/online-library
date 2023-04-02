import { Injectable } from '@nestjs/common';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { UpdateDislikeDto } from './dto/update-dislike.dto';

@Injectable()
export class DislikesService {
  create(createDislikeDto: CreateDislikeDto) {
    return 'This action adds a new dislike';
  }

  findAll() {
    return `This action returns all dislikes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dislike`;
  }

  update(id: number, updateDislikeDto: UpdateDislikeDto) {
    return `This action updates a #${id} dislike`;
  }

  remove(id: number) {
    return `This action removes a #${id} dislike`;
  }
}
