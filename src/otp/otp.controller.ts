import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OtpService } from './otp.service';

@ApiTags("OTP")
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ApiOperation({summary: "Otpni ko'rish"})
  @Get('find-all')
  findAll() {
    return this.otpService.getAllOtp();
  }

  @ApiOperation({summary: "Otpni ID si bo'yicha ko'rish"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otpService.getOneOtp(id);
  }
}
