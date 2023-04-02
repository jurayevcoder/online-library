import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
    @ApiProperty({example: "user@gmail.com", description: "Foydalanuvshining emaili"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "2003-05-05", description: "Foydalanuvshining tug'ilgan sanasi"})
    @IsDate()
    @IsNotEmpty()
    birthday: Date;
}
