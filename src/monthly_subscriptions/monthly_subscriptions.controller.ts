import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MonthlySubscriptionsService } from './monthly_subscriptions.service';
import { CreateMonthlySubscriptionDto } from './dto/create-monthly_subscription.dto';
import { UpdateMonthlySubscriptionDto } from './dto/update-monthly_subscription.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MonthlySubscription } from './models/monthly_subscription.model';

@ApiTags("Oylig Obunalar")
@Controller('monthly-subscriptions')
export class MonthlySubscriptionsController {
  constructor(private readonly monthlySubscriptionsService: MonthlySubscriptionsService) {}

  @ApiOperation({ summary: "Oylig obunaga to'lov qilish" })
  @Post("payment")
  async createMonthlySubscription(@Body() createMonthlySubscriptionDto: CreateMonthlySubscriptionDto): Promise<MonthlySubscription> {
    return this.monthlySubscriptionsService.createMonthlySubscription(createMonthlySubscriptionDto);
  }

  @ApiOperation({ summary: "Oylig obunaga qilingan to'lovni ko'rish " })
  @Get('find-all')
  async getAllMonthlySubscription() {
    return this.monthlySubscriptionsService.getAllMonthlySubscription();
  }

  @ApiOperation({ summary: "Oylig obunaga qilingan to'lovni ID si bo'yicha ko'rish" })
  @Get('find/:id')
  async getOneMonthlySubscription(@Param("id") id: string): Promise<MonthlySubscription> {
    return this.monthlySubscriptionsService.getOneMonthlySubscription(+id);
  }

  @ApiOperation({ summary: "Oylig obunaga qilingan to'lovni ID si bo'yicha o'chirish" })
  @Delete('delete/:id')
  async delOneMonthlySubscription(@Param("id") id: string) {
    return this.monthlySubscriptionsService.delOneMonthlySubscription(+id);
  }

  @ApiOperation({ summary: "Oylig obunaga qilingan to'lovni ID si bo'yicha o'zgartirish" })
  @Put("update/:id")
  async updateMonthlySubscription(@Param('id') id: string, @Body() updateMonthlySubscriptionDto: UpdateMonthlySubscriptionDto) {
    return this.monthlySubscriptionsService.updateMonthlySubscription(+id, updateMonthlySubscriptionDto);
  }
}
