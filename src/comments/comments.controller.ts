import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './models/comment.model';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth-decorator';

@ApiTags("Izohlar")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: "Izohlarni yaratish" })
  @Roles("USER")
  @UseGuards(RolesGuard)
  @Post("create")
  async createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: "Izohlarni ko'rish " })
  @Roles("SUPERADMIN", "ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllComment() {
    return this.commentsService.getAllComment();
  }

  @ApiOperation({ summary: "Izohni ID si bo'yicha ko'rish" })
  @Roles("SUPERADMIN", "ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async getOneComment(@Param("id") id: string): Promise<Comment> {
    return this.commentsService.getOneComment(+id);
  }

  @ApiOperation({ summary: "Izohni ID si bo'yicha o'chirish" })
  @Roles("SUPERADMIN", "ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneComment(@Param("id") id: string) {
    return this.commentsService.delOneComment(+id);
  }

  @ApiOperation({ summary: "Izohni ID si bo'yicha o'zgartirish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Put("update/:id")
  async updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.updateComment(+id, updateCommentDto);
  }
}
