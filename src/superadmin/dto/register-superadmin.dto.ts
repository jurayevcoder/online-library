import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterSuperadminDto { 
    @ApiProperty({example: "Superadmin Superadminov", description: "Superadmining to'liq ismi"})
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({example: "superadmin@gmail.com", description: "Superadmining emaili"})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: "+9989012345678", description: "Superadmining telefon raqami"})
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example: "password", description: "Superadmining paroli"})
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {})
    password: string;

    @ApiProperty({example: "cinfirm_password", description: "Superadmining paroli"})
    @IsString()
    @IsNotEmpty()
    confirm_password: string;
}
