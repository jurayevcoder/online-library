import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({example: "Admin Adminov", description: "Admining to'liq ismi"})
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({example: "admin@gmail.com", description: "Admining emaili"})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: "+9989012345678", description: "Admining telefon raqami"})
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example: "password", description: "Admining paroli"})
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({example: "cinfirm_password", description: "Admining paroli"})
    @IsString()
    @MinLength(6, {})
    confirm_password: string;
}
