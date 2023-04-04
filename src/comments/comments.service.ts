import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './models/comment.model';
import { Book } from '../books/models/book.model';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentRepo: typeof Comment, @InjectModel(Book) private bookRepo: typeof Book) { }

    async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const user = await this.commentRepo.findAll({ where: { user_id: createCommentDto.user_id, book_id: createCommentDto.book_id } });
        const book = await this.bookRepo.findOne({ where: { id: createCommentDto.book_id } })
        let response: any
        if (!book) {
            throw new BadRequestException('No such book found');
        }
        if (user.length != 3) {
            await this.commentRepo.create({
                ...createCommentDto,
            });
            response = {
                message: "Thanks for the comment",
            };
        }
        else {
            response = {
                message: "Limit reached you can't write a comment",
            }
        }
        return response;
    }

    async getAllComment() {
        const commenties = await this.commentRepo.findAll({ include: { all: true } });
        return commenties;
    }

    async getOneComment(id: number): Promise<Comment> {
        const comment = await this.commentRepo.findByPk(id);
        return comment;
    }

    async delOneComment(id: number) {
        return this.commentRepo.destroy({ where: { id } });
    }

    async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
        const comment = await this.commentRepo.update(updateCommentDto, {
            where: { id },
        })
    }
}
