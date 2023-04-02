import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
    @ApiProperty({example: "User Userov", description: "Foydalanuvshining to'liq ism familyasi"})
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({example: "+998901234567", description: "Foydalanuvshining telefon raqami"})
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example: "qwerty", description: "Foydalanuvshining paroli"})
    @IsString()
    @MinLength(6, {})
    password: string;

    @ApiProperty({example: "qwerty", description: "Foydalanuvshining tekshiruv paroli"})
    @IsString()
    confirm_password: string;
}
