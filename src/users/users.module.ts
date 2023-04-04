import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { Otp } from '../otp/models/otp.model';
import { Statistica } from '../statistica/models/statistica.model';
import { MonthlySubscription } from '../monthly_subscriptions/models/monthly_subscription.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Otp, Statistica, MonthlySubscription]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
