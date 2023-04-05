import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, UseGuards, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSalfGuard } from '../guards/user-self.guard';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dt';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { VerifyOtpDto } from './dto/verifyOtp.det';
import { Admin } from './models/admin.model';
import { Roles } from '../decorators/roles-auth-decorator';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: "Admini ro'yxatdan o'tishi" })
  @Post('register')
  async registration(@Body() createAdminDto: CreateAdminDto, @Res({ passthrough: true }) res: Response) {
    return this.adminsService.registration(createAdminDto, res);
  }

  @ApiOperation({ summary: "Admini saytga kirishi" })
  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto, @Res({ passthrough: true }) res: Response) {
    return this.adminsService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: "Admini saytdan chiqishi" })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,

  ) {
    return this.adminsService.logout(refreshToken, res)
  }

  @ApiOperation({ summary: "Admini ro'yxatdan o'tishi" })
  @Post('verify-sms-code')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto, @Res({ passthrough: true }) res: Response) {
    return this.adminsService.verifyOtp(verifyOtpDto, res);
  }

  @ApiOperation({ summary: "Admini ko'rish" })
  @Roles("ADMIN")
  @Get('find-all')
  async getAllAdmin() {
    return this.adminsService.getAllAdmin();
  }

  @ApiOperation({ summary: "Admin ID si bo'yicha ko'rish" })
  @UseGuards(UserSalfGuard)
  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async getOneAdmin(@Param("id") id: string): Promise<Admin> {
    return this.adminsService.getOneAdmin(+id);
  }

  @ApiOperation({ summary: "Admin ID si bo'yicha o'chirish" })
  @UseGuards(UserSalfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delOneAdmin(@Param("id") id: string) {
    return this.adminsService.delOneAdmin(+id);
  }

  @ApiOperation({ summary: "Admin ID si bo'yicha o'zgartirish" })
  @UseGuards(UserSalfGuard)
  @UseGuards(JwtAuthGuard)
  @Put("update/:id")
  async updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.updateAdmin(+id, updateAdminDto);
  }
}
