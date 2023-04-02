import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { Otp } from '../otp/models/otp.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Otp]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
