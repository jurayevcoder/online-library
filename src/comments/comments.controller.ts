import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './models/comment.model';

@ApiTags("Izohlar")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: "Izohlarni yaratish" })
  @Post("create")
  async createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: "Izohlarni ko'rish " })
  @Get('find-all')
  async getAllComment() {
    return this.commentsService.getAllComment();
  }

  @ApiOperation({ summary: "Izohni ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneComment(@Param("id") id: string): Promise<Comment> {
    return this.commentsService.getOneComment(+id);
  }

  @ApiOperation({ summary: "Izohni ID si bo'yicha o'chirish" })
  @Delete('delete/:id')
  async delOneComment(@Param("id") id: string) {
    return this.commentsService.delOneComment(+id);
  }

  @ApiOperation({ summary: "Izohni ID si bo'yicha o'zgartirish" })
  @Put("update/:id")
  async updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.updateComment(+id, updateCommentDto);
  }
}
