import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { MonthlySubscriptionsService } from './monthly_subscriptions.service';
import { CreateMonthlySubscriptionDto } from './dto/create-monthly_subscription.dto';
import { UpdateMonthlySubscriptionDto } from './dto/update-monthly_subscription.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MonthlySubscription } from './models/monthly_subscription.model';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth-decorator';

@ApiTags("Oylig Obunalar")
@Controller('monthly-subscriptions')
export class MonthlySubscriptionsController {
  constructor(private readonly monthlySubscriptionsService: MonthlySubscriptionsService) {}

  @ApiOperation({ summary: "Oylig obunaga to'lov qilish" })
  @Roles("USER")
  @UseGuards(RolesGuard)
  @Post("payment")
  async createMonthlySubscription(@Body() createMonthlySubscriptionDto: CreateMonthlySubscriptionDto): Promise<MonthlySubscription> {
    return this.monthlySubscriptionsService.createMonthlySubscription(createMonthlySubscriptionDto);
  }

  @ApiOperation({ summary: "Oylig obunaga qilingan to'lovni ko'rish " })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllMonthlySubscription() {
    return this.monthlySubscriptionsService.getAllMonthlySubscription();
  }

  @ApiOperation({ summary: "Oylig obunaga qilingan to'lovni ID si bo'yicha ko'rish" })
  @Roles("SUPERADMIN", "ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async getOneMonthlySubscription(@Param("id") id: string): Promise<MonthlySubscription> {
    return this.monthlySubscriptionsService.getOneMonthlySubscription(+id);
  }

  @ApiOperation({ summary: "Oylig obunaga qilingan to'lovni ID si bo'yicha o'chirish" })
  @Roles("SUPERADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async delOneMonthlySubscription(@Param("id") id: string) {
    return this.monthlySubscriptionsService.delOneMonthlySubscription(+id);
  }
}
