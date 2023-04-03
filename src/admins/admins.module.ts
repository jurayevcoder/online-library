import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { Otp } from '../otp/models/otp.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Admin, Otp]), JwtModule],
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
