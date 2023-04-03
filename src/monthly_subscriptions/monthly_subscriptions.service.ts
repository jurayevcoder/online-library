import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMonthlySubscriptionDto } from './dto/create-monthly_subscription.dto';
import { UpdateMonthlySubscriptionDto } from './dto/update-monthly_subscription.dto';
import { MonthlySubscription } from './models/monthly_subscription.model';

@Injectable()
export class MonthlySubscriptionsService {
  constructor(@InjectModel(MonthlySubscription) private monthlySubscriptionRepo: typeof MonthlySubscription) {}

    async createMonthlySubscription(createMonthlySubscriptionDto: CreateMonthlySubscriptionDto): Promise<MonthlySubscription> {
        const monthly_subscription = await this.monthlySubscriptionRepo.create(createMonthlySubscriptionDto);
        return monthly_subscription;
    }

    async getAllMonthlySubscription(){
        const monthly_subscriptionies = await this.monthlySubscriptionRepo.findAll({include: {all: true}});
        return monthly_subscriptionies;
    }

    async getOneMonthlySubscription(id: number): Promise<MonthlySubscription>{
        const monthly_subscription = await this.monthlySubscriptionRepo.findByPk(id);
        return monthly_subscription;
    }

    async delOneMonthlySubscription(id: number){
        return this.monthlySubscriptionRepo.destroy({where: {id}});
    }

    async updateMonthlySubscription(id: number, updateMonthlySubscriptionDto: UpdateMonthlySubscriptionDto){
        const monthly_subscription = await this.monthlySubscriptionRepo.update(updateMonthlySubscriptionDto,{
            where: {id},
        })
    }
}
