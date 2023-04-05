import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus, HttpCode, Put } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { RegisterSuperadminDto } from './dto/register-superadmin.dto';
import { UpdateSuperadminDto } from './dto/update-superadmin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Response } from 'express';
import { LoginSuperadminDto } from './dto/login-superadmin.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { VerifyOtpDto } from './dto/verifyOtp.det';
import { UserSalfGuard } from 'src/guards/user-self.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Superadmin } from './models/superadmin.model';

@ApiTags("Superadminlar")
@Controller('superadmin')
export class SuperadminController {
  constructor(private readonly superadminService: SuperadminService) {}

  @ApiOperation({ summary: "SuperSuperadmini ro'yxatdan o'tishi" })
  @Post('register')
  async registration(@Body() registerSuperadminDto: RegisterSuperadminDto, @Res({ passthrough: true }) res: Response) {
    return this.superadminService.registration(registerSuperadminDto, res);
  }

  @ApiOperation({ summary: "Superadmini saytga kirishi" })
  @Post('login')
  async login(@Body() loginSuperadminDto: LoginSuperadminDto, @Res({ passthrough: true }) res: Response) {
    return this.superadminService.login(loginSuperadminDto, res);
  }

  @ApiOperation({ summary: "Superadmini saytdan chiqishi" })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,

  ) {
    return this.superadminService.logout(refreshToken, res)
  }

  @ApiOperation({ summary: "Superadmini ro'yxatdan o'tishi" })
  @Post('verify-sms-code')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto, @Res({ passthrough: true }) res: Response) {
    return this.superadminService.verifyOtp(verifyOtpDto, res);
  }

  @ApiOperation({ summary: "Superadmini ko'rish" })
  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllAdmin() {
    return this.superadminService.getAllAdmin();
  }

  @ApiOperation({ summary: "Superadmini ID si bo'yicha ko'rish" })
  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(UserSalfGuard)
  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async getOneAdmin(@Param("id") id: string): Promise<Superadmin> {
    return this.superadminService.getOneAdmin(+id);
  }

  @ApiOperation({ summary: "Superadmini ID si bo'yicha o'chirish" })
  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(UserSalfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delOneAdmin(@Param("id") id: string) {
    return this.superadminService.delOneAdmin(+id);
  }

  @ApiOperation({ summary: "Superadmini ID si bo'yicha o'zgartirish" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(UserSalfGuard)
  @UseGuards(JwtAuthGuard)
  @Put("update/:id")
  async updateAdmin(@Param('id') id: string, @Body() updateSuperadminDto: UpdateSuperadminDto) {
    return this.superadminService.updateAdmin(+id, updateSuperadminDto);
  }
}
