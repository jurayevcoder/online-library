import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateDislikeDto {
    @ApiProperty({example: "1", description: "Foydalanuvchi ID si"})
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({example: "1", description: "Kitob ID si"})
    @IsInt()
    @IsNotEmpty()
    book_id: number;
}
