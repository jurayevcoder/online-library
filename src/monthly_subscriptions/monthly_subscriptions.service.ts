import { Injectable } from '@nestjs/common';
import { CreateMonthlySubscriptionDto } from './dto/create-monthly_subscription.dto';
import { UpdateMonthlySubscriptionDto } from './dto/update-monthly_subscription.dto';

@Injectable()
export class MonthlySubscriptionsService {
  create(createMonthlySubscriptionDto: CreateMonthlySubscriptionDto) {
    return 'This action adds a new monthlySubscription';
  }

  findAll() {
    return `This action returns all monthlySubscriptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthlySubscription`;
  }

  update(id: number, updateMonthlySubscriptionDto: UpdateMonthlySubscriptionDto) {
    return `This action updates a #${id} monthlySubscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthlySubscription`;
  }
}
