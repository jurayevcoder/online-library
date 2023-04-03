import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
    @ApiProperty({example: "User Userov", description: "Foydalanuvshining to'liq ism familyasi"})
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({example: "user@gmail.com", description: "Foydalanuvshining emaili"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "+998901234567", description: "Foydalanuvshining telefon raqami"})
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example: "2003-05-05", description: "Foydalanuvshining tug'ilgan sanasi"})
    @IsNotEmpty()
    birthday: Date;

    @ApiProperty({example: "qwerty", description: "Foydalanuvshining paroli"})
    @IsString()
    @MinLength(6, {})
    password: string;

    @ApiProperty({example: "qwerty", description: "Foydalanuvshining tekshiruv paroli"})
    @IsString()
    confirm_password: string;
}
