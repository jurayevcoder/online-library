import { Module } from '@nestjs/common';
import { MonthlySubscriptionsService } from './monthly_subscriptions.service';
import { MonthlySubscriptionsController } from './monthly_subscriptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MonthlySubscription } from './models/monthly_subscription.model';

@Module({
  imports: [SequelizeModule.forFeature([MonthlySubscription])],
  controllers: [MonthlySubscriptionsController],
  providers: [MonthlySubscriptionsService]
})
export class MonthlySubscriptionsModule {}
