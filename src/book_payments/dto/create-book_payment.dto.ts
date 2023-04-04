import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBookPaymentDto {
    @ApiProperty({example: "1", description: "Foydalanuvchi ID si"})
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({example: "1", description: "Kitob ID si"})
    @IsInt()
    @IsNotEmpty()
    book_id: number;

    @ApiProperty({example: "yetgazib berish || olib ketish", description: "Kitobni olish turi"})
    @IsBoolean()
    @IsNotEmpty()
    delivery: boolean;   
}
