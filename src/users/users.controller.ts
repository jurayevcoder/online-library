import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpCode, UseGuards, Put, HttpException, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { UserSalfGuard } from '../guards/user-self.guard';
import { User } from './models/user.model';
import { VerifyOtpDto } from './dto/verifyOtp.det';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { ErrorCode } from 'src/exceptions/ErrorCode';

@ApiTags("Foydalanuvchilar")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: "Foydalanuvchini ro'yxatdan o'tishi" })
  @Post('register')
  async registration(@Body() registerUserDto: RegisterUserDto, @Res({ passthrough: true }) res: Response) {
    try {
        await this.usersService.registration(registerUserDto, res);
    } catch (error) { 
      throw new ErrorCode("Registerda xatolik")
    }
    return this.usersService.registration(registerUserDto, res);
  }

  @ApiOperation({ summary: "Foydalanuvchini saytga kirishi" })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    return this.usersService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: "Foydalanuvchini saytdan chiqishi" })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.logout(refreshToken, res)
  }

  @ApiOperation({ summary: "Foydalanuvchini ro'yxatdan o'tishi" })
  @Post('verify-sms-code')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto, @Res({ passthrough: true }) res: Response) {
    return this.usersService.verifyOtp(verifyOtpDto, res);
  }

  @ApiOperation({ summary: "Foydalanuvchini ko'rish" })
  @Roles("ADMIN", "SUPERADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async getAllUser() {
    return this.usersService.getAllUser();
  }

  
  @ApiOperation({ summary: "Foydalanuvchin ID si bo'yicha ko'rish" })
  @Roles("USER")
  @UseGuards(RolesGuard)
  @UseGuards(UserSalfGuard)
  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async getOneUser(@Param("id") id: string): Promise<User> {
    return this.usersService.getOneUser(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchin ID si bo'yicha o'chirish" })
  @Roles("USER")
  @UseGuards(RolesGuard)
  @UseGuards(UserSalfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delOneUser(@Param("id") id: string) {
    return this.usersService.delOneUser(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchin ID si bo'yicha o'zgartirish" })
  @Roles("USER")
  @UseGuards(RolesGuard)
  @UseGuards(UserSalfGuard)
  @UseGuards(JwtAuthGuard)
  @Put("update/:id")
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }
}
