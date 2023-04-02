import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment_methods.service';
import { PaymentMethodsController } from './payment_methods.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentMethod } from './models/payment_method.model';

@Module({
  imports: [SequelizeModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService]
})
export class PaymentMethodsModule {}
