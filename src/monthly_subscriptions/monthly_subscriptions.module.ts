import { Module } from '@nestjs/common';
import { MonthlySubscriptionsService } from './monthly_subscriptions.service';
import { MonthlySubscriptionsController } from './monthly_subscriptions.controller';

@Module({
  controllers: [MonthlySubscriptionsController],
  providers: [MonthlySubscriptionsService]
})
export class MonthlySubscriptionsModule {}
