import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
}
