import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Advertisement } from './models/advertisement.model';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth-decorator';

@ApiTags("Reklamalar")
@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @ApiOperation({ summary: "Reklama yaratish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Post("create")
  async createAdvertisement(@Body() createAdvertisementDto: CreateAdvertisementDto): Promise<Advertisement> {
    return this.advertisementsService.createAdvertisement(createAdvertisementDto);
  }

  @ApiOperation({ summary: "Reklamalarni ko'rish " })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllAdvertisement() {
    return this.advertisementsService.getAllAdvertisement();
  }

  @ApiOperation({ summary: "Reklamani ID si bo'yicha ko'rish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async getOneAdvertisement(@Param("id") id: string): Promise<Advertisement> {
    return this.advertisementsService.getOneAdvertisement(+id);
  }

  @ApiOperation({ summary: "Reklamani ID si bo'yicha o'chirish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneAdvertisement(@Param("id") id: string) {
    return this.advertisementsService.delOneAdvertisement(+id);
  }

  @ApiOperation({ summary: "Reklamani ID si bo'yicha o'zgartirish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Put("update/:id")
  async updateAdvertisement(@Param('id') id: string, @Body() updateAdvertisementDto: UpdateAdvertisementDto) {
    return this.advertisementsService.updateAdvertisement(+id, updateAdvertisementDto);
  }
}
