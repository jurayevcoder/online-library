import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './models/discount.model';

@Injectable()
export class DiscountsService {
  constructor(@InjectModel(Discount) private discountRepo: typeof Discount) {}

    async createDiscount(createDiscountDto: CreateDiscountDto): Promise<Discount> {
        const discount = await this.discountRepo.create(createDiscountDto);
        return discount;
    }

    async getAllDiscount(){
        const discounties = await this.discountRepo.findAll({include: {all: true}});
        return discounties;
    }

    async getOneDiscount(id: number): Promise<Discount>{
        const discount = await this.discountRepo.findByPk(id);
        return discount;
    }

    async delOneDiscount(id: number){
        return this.discountRepo.destroy({where: {id}});
    }

    async updateDiscount(id: number, updateDiscountDto: UpdateDiscountDto){
        const discount = await this.discountRepo.update(updateDiscountDto,{
            where: {id},
        })
    }
}
