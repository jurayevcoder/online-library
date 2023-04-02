import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentMethodDto {
    @ApiProperty({example: "cart", description: "To'lov qilish usuli"})
    @IsString()
    @IsNotEmpty()
    name: string
}