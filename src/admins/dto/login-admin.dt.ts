import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginAdminDto {

    @ApiProperty({example: "admin@gmail.com", description: "Admining emaili"})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: "password", description: "Admining paroli"})
    @IsString()
    @IsNotEmpty()
    password: string;
}