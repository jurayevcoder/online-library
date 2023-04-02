import { PartialType } from '@nestjs/swagger';
import { CreateMonthlySubscriptionDto } from './create-monthly_subscription.dto';

export class UpdateMonthlySubscriptionDto extends PartialType(CreateMonthlySubscriptionDto) {}
