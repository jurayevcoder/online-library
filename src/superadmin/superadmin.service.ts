import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterSuperadminDto } from './dto/register-superadmin.dto';
import { UpdateSuperadminDto } from './dto/update-superadmin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Superadmin } from './models/superadmin.model';
import { Otp } from 'src/otp/models/otp.model';
import { JwtService } from '@nestjs/jwt';
import { dates, decode, encode } from '../helpers/crypto';
import { v4 as uuidv4, v4 } from 'uuid';
import * as otpGenerator from 'otp-generator';
import * as bcrypt from 'bcrypt';
import { AddMinutesToDate } from 'src/helpers/addMinutes';
import { Op } from 'sequelize';
import { LoginSuperadminDto } from './dto/login-superadmin.dto';
import { Response } from 'express';
import { VerifyOtpDto } from './dto/verifyOtp.det';

let newSuperAdmin:any
@Injectable()
export class SuperadminService {
  constructor(
    @InjectModel(Superadmin) private superadminRepo: typeof Superadmin,
    @InjectModel(Otp) private otpRepo: typeof Otp,
    private readonly jwtService: JwtService,
  ) { }
  async registration(registerSuperAdminDto: RegisterSuperadminDto, res: Response) {
    const superadmin = await this.superadminRepo.findOne({ where: { phone: registerSuperAdminDto.phone } });
    if (superadmin) {
      throw new BadRequestException('Phone already exists!');
    }
    
    if (registerSuperAdminDto.password !== registerSuperAdminDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(registerSuperAdminDto.password, 7);
    newSuperAdmin = {...registerSuperAdminDto, hashed_password: hashed_password, role: "SUPERADMIN" }

    const phone_number = registerSuperAdminDto.phone;
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
      message: 'OTP send to superadmin',
      otp_id: newOtp.id,
    };
    const encoded = await encode(JSON.stringify(details));
    return { status: 'Success', Details: encoded };
  }



  async login(loginSuperAdminDto: LoginSuperadminDto, res: Response) {
    const { email, password } = loginSuperAdminDto;
    const superadmin = await this.superadminRepo.findOne({ where: { email } });
    if (!superadmin) {
      throw new UnauthorizedException('SuperAdmin not registered');
    }
    const isMatchPass = await bcrypt.compare(password, superadmin.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Password error');
    }
    const tokens = await this.getTokens(superadmin)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedSuperAdmin = await this.superadminRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: superadmin.id }, returning: true },)

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'SuperAdmin logged in',
      superadmin: updatedSuperAdmin[1][0],
      tokens,
    }
    return response;
  }



  async logout(refreshToken: string, res: Response) {
    const superadmin = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    })
    if (!superadmin) {
      throw new ForbiddenException('SuperAdmin not found');
    }
    const updatedSuperAdmin = await this.superadminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: superadmin.id }, returning: true },
    )
    res.clearCookie('refresh_token');
    const response = {
      message: 'SuperAdmin logged out successfully',
      admin: updatedSuperAdmin[1][0],
    }
    return response;

  }

  async getAllAdmin() {
    const superadminies = await this.superadminRepo.findAll({ include: { all: true } });
    return superadminies;
  }

  async getOneAdmin(id: number): Promise<Superadmin> {
    const superadmin = await this.superadminRepo.findByPk(id);
    return superadmin;
  }

  async delOneAdmin(id: number) {
    return this.superadminRepo.destroy({ where: { id } });
  }

  async updateAdmin(id: number, updateSuperAdminDto: UpdateSuperadminDto) {
    const superadmin = await this.superadminRepo.update(updateSuperAdminDto, {
      where: { id },
    })
  }


  async refreshToken(superadmin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (superadmin_id != decodedToken['id']) {
      throw new BadRequestException('SuperAdmin not found!');
    }
    const superadmin = await this.superadminRepo.findOne({ where: { id: superadmin_id } });
    if (!superadmin || !superadmin.hashed_refresh_token) {
      throw new BadRequestException('SuperAdmin not found!');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      superadmin.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(superadmin)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.superadminRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: superadmin.id }, returning: true },)

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin logged in',
      admin: updatedAdmin[1][0],
      tokens,
    }
    return response;
  }


  async getTokens(superadmin: Superadmin) {
    const jwtPayload = {
      id: superadmin.id,
      email: superadmin.email,
      phone: superadmin.phone,
      role: superadmin.role,
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
            console.log(newSuperAdmin);
            if (newSuperAdmin.phone == phone) {
              
              
              const newConfirSuperAdmin = await this.superadminRepo.create({
                ...newSuperAdmin
              })

              const tokens = await this.getTokens(
                newConfirSuperAdmin
              )
          
              const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
          
              
              
              const updatedSuperAdmin = await this.superadminRepo.update({
                hashed_refresh_token: hashed_refresh_token,
              },
                { where: { id: newConfirSuperAdmin.id }, returning: true },)
          
              res.cookie('refresh_token', tokens.refresh_token, {
                maxAge: 15 * 42 * 60 * 60 * 1000,
                httpOnly: true,
              });
          
              await this.otpRepo.update(
                { verified: true },
                { where: { id: obj.otp_id }, returning: true },
              )
              const response = {
                message: 'Phone verified and SuperAdmin Registred',
                admin: updatedSuperAdmin[1][0],
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
