import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {

    @ApiProperty({example: "1", description: "Foydalanuvchi ID si"})
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({example: "1", description: "Kitob ID si"})
    @IsInt()
    @IsNotEmpty()
    book_id: number;

    @ApiProperty({example: "comment", description: "Kitobga yozilgan comment"})
    @IsString()
    @IsNotEmpty()
    comment: string;
}
