import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateLikeDto {
    @ApiProperty({example: "1", description: "Kitob ID si"})
    @IsInt()
    @IsNotEmpty()
    book_id: number;
}
