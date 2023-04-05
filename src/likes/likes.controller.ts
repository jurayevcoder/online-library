import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Like } from './models/like.model';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth-decorator';

@ApiTags("Layklar")
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({ summary: "Layk bosish" })
  @Roles("USER")
  @UseGuards(RolesGuard)
  @Post("like")
  async createLike(@Body() createLikeDto: CreateLikeDto): Promise<Like> {
    return this.likesService.createLike(createLikeDto);
  }

  @ApiOperation({ summary: "Layklarni ko'rish " })
  @Roles("SUPERADMIN", "ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllLike() {
    return this.likesService.getAllLike();
  }

  @ApiOperation({ summary: "Laykni ID si bo'yicha ko'rish" })
  @Roles("SUPERADMIN", "ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async getOneLike(@Param("id") id: string): Promise<Like> {
    return this.likesService.getOneLike(+id);
  }
}