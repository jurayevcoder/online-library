import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonthlySubscriptionsService } from './monthly_subscriptions.service';
import { CreateMonthlySubscriptionDto } from './dto/create-monthly_subscription.dto';
import { UpdateMonthlySubscriptionDto } from './dto/update-monthly_subscription.dto';

@Controller('monthly-subscriptions')
export class MonthlySubscriptionsController {
  constructor(private readonly monthlySubscriptionsService: MonthlySubscriptionsService) {}

  @Post()
  create(@Body() createMonthlySubscriptionDto: CreateMonthlySubscriptionDto) {
    return this.monthlySubscriptionsService.create(createMonthlySubscriptionDto);
  }

  @Get()
  findAll() {
    return this.monthlySubscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthlySubscriptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonthlySubscriptionDto: UpdateMonthlySubscriptionDto) {
    return this.monthlySubscriptionsService.update(+id, updateMonthlySubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monthlySubscriptionsService.remove(+id);
  }
}
