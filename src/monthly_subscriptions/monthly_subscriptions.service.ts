import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMonthlySubscriptionDto } from './dto/create-monthly_subscription.dto';
import { UpdateMonthlySubscriptionDto } from './dto/update-monthly_subscription.dto';
import { MonthlySubscription } from './models/monthly_subscription.model';
import { Statistica } from '../statistica/models/statistica.model';

@Injectable()
export class MonthlySubscriptionsService {
    constructor(
        @InjectModel(MonthlySubscription) private monthlySubscriptionRepo: typeof MonthlySubscription,
        @InjectModel(Statistica) private statisticaRepo: typeof Statistica,
    ) { }

    async createMonthlySubscription(createMonthlySubscriptionDto: CreateMonthlySubscriptionDto): Promise<MonthlySubscription> {
        let monthly_subscription: any
        const user = await this.monthlySubscriptionRepo.findOne({ where: { user_id: createMonthlySubscriptionDto.user_id } })
        if (user) {
            throw new BadRequestException('You have already paid');
        }
        else {
            monthly_subscription = await this.monthlySubscriptionRepo.create(createMonthlySubscriptionDto);
            const statistica = await this.statisticaRepo.findOne({ where: { id: 1 } })

            if (statistica) {
                await this.statisticaRepo.update(
                    {
                        number_subscribed_user: statistica.number_subscribed_user + 1,
                        unsubscribed_user_number: statistica.unsubscribed_user_number - 1
                    },
                    { where: { id: 1 }, returning: true }
                )
            }
        }
        return monthly_subscription;
    }

    async getAllMonthlySubscription() {
        const monthly_subscriptionies = await this.monthlySubscriptionRepo.findAll({ include: { all: true } });
        return monthly_subscriptionies;
    }

    async getOneMonthlySubscription(id: number): Promise<MonthlySubscription> {
        const monthly_subscription = await this.monthlySubscriptionRepo.findByPk(id);
        return monthly_subscription;
    }

    async delOneMonthlySubscription(id: number) {
        return this.monthlySubscriptionRepo.destroy({ where: { id } });
    }

    async updateMonthlySubscription(id: number, updateMonthlySubscriptionDto: UpdateMonthlySubscriptionDto) {
        const monthly_subscription = await this.monthlySubscriptionRepo.update(updateMonthlySubscriptionDto, {
            where: { id },
        })
    }
}
