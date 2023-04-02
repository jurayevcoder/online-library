import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsPhoneNumber, IsString } from "class-validator";

export class VerifyOtpDto {
    @ApiProperty({example: "+998901234567", description: "Foydalanuvchi telefon raqami"})
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({example: "4569", description: "Foydalanuvchi telefon raqamiga jo'natilgan code"})
    @IsNumberString()
    sms_code: string;

    @ApiProperty({example: "key", description: "Foydalanuvchi tekshiruv keyi"})
    @IsNotEmpty()
    @IsString()
    verification_key: string;
}