import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './models/discount.model';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth-decorator';

@ApiTags("Chegirmalar")
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @ApiOperation({ summary: "Chegirma yaratish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Post("create")
  async createDiscount(@Body() createDiscountDto: CreateDiscountDto): Promise<Discount> {
    return this.discountsService.createDiscount(createDiscountDto);
  }

  @ApiOperation({ summary: "Chegirmalarni ko'rish " })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllDiscount() {
    return this.discountsService.getAllDiscount();
  }

  @ApiOperation({ summary: "Chegirmani ID si bo'yicha ko'rish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async getOneDiscount(@Param("id") id: string): Promise<Discount> {
    return this.discountsService.getOneDiscount(+id);
  }

  @ApiOperation({ summary: "Chegirmani ID si bo'yicha o'chirish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneDiscount(@Param("id") id: string) {
    return this.discountsService.delOneDiscount(+id);
  }

  @ApiOperation({ summary: "Chegirmani ID si bo'yicha o'zgartirish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Put("update/:id")
  async updateDiscount(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return this.discountsService.updateDiscount(+id, updateDiscountDto);
  }
}
