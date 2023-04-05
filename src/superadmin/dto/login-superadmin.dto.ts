import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginSuperadminDto {
    @ApiProperty({example: "superadmin@gmail.com", description: "Superadmining emaili"})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: "password", description: "Superadmining paroli"})
    @IsString()
    @IsNotEmpty()
    password: string;
}