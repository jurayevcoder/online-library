import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateMonthlySubscriptionDto {
    @ApiProperty({example: "1", description: "Foydalanuvchi ID si"})
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({example: "25000", description: "Oylig obuna narxi"})
    @IsInt()
    @IsNotEmpty()
    price: number;

    @ApiProperty({example: "1", description: "Chegirmalar ID si"})
    @IsInt()
    @IsNotEmpty()
    discount_id: number;

    @ApiProperty({example: "1", description: "To'lov usuli ID si"})
    @IsInt()
    @IsNotEmpty()
    payment_method_id: number;
}
