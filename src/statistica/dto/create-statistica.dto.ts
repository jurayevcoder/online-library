import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateStatisticaDto {
    @ApiProperty({example: "256", description: "Hamma foydalanuchilar soni"})
    @IsInt()
    total_number_of_user: number;

    @ApiProperty({example: "25", description: "Obuna bo'lgan foydalanuchilar soni"})
    @IsInt()
    number_subscribed_user: number;

    @ApiProperty({example: "56", description: "Obuna bo'lmagan foydalanuchilar soni"})
    @IsInt()
    unsubscribed_user_number: number;

    @ApiProperty({example: "200", description: "Kitoblar soni"})
    @IsInt()
    total_number_of_books: number;

    @ApiProperty({example: "20", description: "Reklamalar soni"})
    @IsInt()
    total_number_of_ads: number;
}
