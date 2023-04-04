import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import * as otpGenerator from 'otp-generator';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { Op } from 'sequelize';
import { Otp } from '../otp/models/otp.model';
import { dates, decode, encode } from '../helpers/crypto';
import { v4 as uuidv4, v4 } from 'uuid';
import { VerifyOtpDto } from './dto/verifyOtp.det';
import { Statistica } from '../statistica/models/statistica.model';
import { MonthlySubscription } from '../monthly_subscriptions/models/monthly_subscription.model';

let newUser: any
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    @InjectModel(Otp) private otpRepo: typeof Otp,
    @InjectModel(MonthlySubscription) private monthlySubscriptionRepo: typeof MonthlySubscription,
    @InjectModel(Statistica) private statisticaRepo: typeof Statistica,

    private readonly jwtService: JwtService,
  ) { }
  async registration(registerUserDto: RegisterUserDto, res: Response) {
    const user = await this.userRepo.findOne({ where: { phone: registerUserDto.phone } });
    if (user) {
      throw new BadRequestException('Phone already exists!');
    }

    if (registerUserDto.password !== registerUserDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(registerUserDto.password, 7);
    newUser = { ...registerUserDto, hashed_password: hashed_password, role: "USER" }

    const phone_number = registerUserDto.phone;
    const sms_code = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.destroy({ where: { [Op.and]: [{ phone: phone_number }, { verified: false }] } });
    const newOtp = await this.otpRepo.create({
      id: v4(),
      phone: phone_number,
      sms_code,
      expiration_time,
    });

    const details = {
      timestamp: now,
      phone: phone_number,
      success: true,
      message: 'OTP send to user',
      otp_id: newOtp.id,
    };
    const encoded = await encode(JSON.stringify(details));
    return { status: 'Success', Details: encoded };
  }



  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not registered');
    }
    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Password error');
    }
    const tokens = await this.getTokens(user)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: user.id }, returning: true },)

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    }
    return response;
  }



  async logout(refreshToken: string, res: Response) {
    const user = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    })
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token: null },
      { where: { id: user.id }, returning: true },
    )
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out successfully',
      user: updatedUser[1][0],
    }
    return response;

  }

  async getAllUser() {
    const useries = await this.userRepo.findAll({ include: { all: true } });
    return useries;
  }

  async getOneUser(id: number): Promise<User> {
    const user = await this.userRepo.findByPk(id);
    return user;
  }

  async delOneUser(id: number) {
    const statistica = await this.statisticaRepo.findOne({ where: { id: 1 } })
    const msUser = await this.monthlySubscriptionRepo.findOne({where: {user_id: id}})
    if (msUser){
      await this.statisticaRepo.update(
        { total_number_of_user: statistica.total_number_of_user - 1, number_subscribed_user: statistica.number_subscribed_user - 1},
        { where: { id: 1 }, returning: true }
      )
    } 
    else {
      await this.statisticaRepo.update(
        { total_number_of_user: statistica.total_number_of_user - 1, unsubscribed_user_number: statistica.unsubscribed_user_number - 1},
        { where: { id: 1 }, returning: true }
      )
    }


    return this.userRepo.destroy({ where: { id } });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.update(updateUserDto, {
      where: { id },
    })
  }


  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('User not found!');
    }
    const user = await this.userRepo.findOne({ where: { id: user_id } });
    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('User not found!');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(user)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: user.id }, returning: true },)

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    }
    return response;
  }


  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      })
    ])
    return {
      access_tokken: accessToken,
      refresh_token: refreshToken,
    };
  }


  async verifyOtp(verifyOtpDto: VerifyOtpDto, res: Response) {
    const { verification_key, sms_code, phone } = verifyOtpDto;
    const currentdate = new Date();
    const decoded = await decode(verification_key);
    const obj = JSON.parse(decoded);
    const phone_obj = obj.phone;
    if (phone_obj != phone) {
      throw new BadRequestException('OTP bu raqamga yuborilmagan');
    }
    const result = await this.otpRepo.findOne({
      where: { id: obj.otp_id },
    })
    if (result != null) {
      if (!result.verified) {
        if (dates.compare(result.expiration_time, currentdate)) {
          if (sms_code === result.sms_code) {
            console.log(newUser);
            if (newUser.phone == phone) {


              const newConfirUser = await this.userRepo.create({
                ...newUser
              })

              const statistica = await this.statisticaRepo.findOne({ where: { id: 1 } })
              console.log(statistica);

              if (statistica) {
                await this.statisticaRepo.update(
                  { total_number_of_user: statistica.total_number_of_user + 1 },
                  { where: { id: 1 }, returning: true }
                )

                await this.statisticaRepo.update(
                  { unsubscribed_user_number: statistica.unsubscribed_user_number + 1},
                  { where: { id: 1 }, returning: true }
              )
              }
              if (!statistica) {
                await this.statisticaRepo.create(
                  { total_number_of_user: 1 , unsubscribed_user_number: 1}
                )
              }

              const tokens = await this.getTokens(
                newConfirUser
              )

              const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);



              const updatedUser = await this.userRepo.update({
                hashed_refresh_token: hashed_refresh_token,
              },
                { where: { id: newConfirUser.id }, returning: true },)

              res.cookie('refresh_token', tokens.refresh_token, {
                maxAge: 15 * 42 * 60 * 60 * 1000,
                httpOnly: true,
              });

              await this.otpRepo.update(
                { verified: true },
                { where: { id: obj.otp_id }, returning: true },
              )
              const response = {
                message: 'Phone verified and User Registred',
                user: updatedUser[1][0],
                tokens,
              };
              return response;
            }
          } else {
            throw new BadRequestException('OTP is not match');
          }
        } else {
          throw new BadRequestException('OTP expired');
        }
      } else {
        throw new BadRequestException('OTP already used');
      }
    } else {
      throw new BadRequestException("Bunday foydalanuvchi yo'q");
    }
  }
}
