import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Otp } from './models/otp.model';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp) private otpRepo: typeof Otp) { }
  async getAllOtp() {
    const otpies = await this.otpRepo.findAll();
    return otpies;
  }

  async getOneOtp(id: string): Promise<Otp> {
    const otp = await this.otpRepo.findByPk(id);
    return otp;
  }
}
