import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discount } from './models/discount.model';

@Module({
  imports: [SequelizeModule.forFeature([Discount])],
  controllers: [DiscountsController],
  providers: [DiscountsService]
})
export class DiscountsModule {}
