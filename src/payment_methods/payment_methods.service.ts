import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { PaymentMethod } from './models/payment_method.model';

@Injectable()
export class PaymentMethodsService {
  constructor(@InjectModel(PaymentMethod) private paymentMeyhodRepo: typeof PaymentMethod) {}

    async createPaymentMethod(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
        const payment_method = await this.paymentMeyhodRepo.create(createPaymentMethodDto);
        return payment_method;
    }

    async getAllPaymentMethod(){
        const payment_methodies = await this.paymentMeyhodRepo.findAll({include: {all: true}});
        return payment_methodies;
    }

    async getOnePaymentMethod(id: number): Promise<PaymentMethod>{
        const payment_method = await this.paymentMeyhodRepo.findByPk(id);
        return payment_method;
    }

    async delOnePaymentMethod(id: number){
        return this.paymentMeyhodRepo.destroy({where: {id}});
    }

    async updatePaymentMethod(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto){
        const payment_method = await this.paymentMeyhodRepo.update(updatePaymentMethodDto,{
            where: {id},
        })
    }
}