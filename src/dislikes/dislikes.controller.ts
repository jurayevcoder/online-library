import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DislikesService } from './dislikes.service';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { UpdateDislikeDto } from './dto/update-dislike.dto';
import { Dislike } from './models/dislike.model';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth-decorator';

@ApiTags("Dislayklar")
@Controller('dislikes')
export class DislikesController {
  constructor(private readonly dislikesService: DislikesService) {}

  @ApiOperation({ summary: "Dislayk bosish" })
  @Roles("USER")
  @UseGuards(RolesGuard)
  @Post("dislike")
  async createDislike(@Body() createDislikeDto: CreateDislikeDto): Promise<Dislike> {
    return this.dislikesService.createDislike(createDislikeDto);
  }

  @ApiOperation({ summary: "Dislayklarni ko'rish " })
  @Roles("SUPERADMIN", "ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllDislike() {
    return this.dislikesService.getAllDislike();
  }

  @ApiOperation({ summary: "Dislaykni ID si bo'yicha ko'rish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async getOneDislike(@Param("id") id: string): Promise<Dislike> {
    return this.dislikesService.getOneDislike(+id);
  }
}