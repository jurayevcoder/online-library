import { Module } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { SuperadminController } from './superadmin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Superadmin } from './models/superadmin.model';
import { Otp } from 'src/otp/models/otp.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Superadmin, Otp]), JwtModule],
  controllers: [SuperadminController],
  providers: [SuperadminService]
})
export class SuperadminModule {}
