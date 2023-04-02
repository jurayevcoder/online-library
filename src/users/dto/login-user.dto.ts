import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: "user@gmail.com", description: "Foydalanuvshining emaili"})
    @IsEmail()
    phone: string;

    @ApiProperty({example: "qwerty", description: "Foydalanuvshining paroli"})
    @IsString()
    password: string;
}