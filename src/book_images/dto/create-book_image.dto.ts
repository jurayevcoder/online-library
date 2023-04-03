import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBookImageDto {
    @ApiProperty({example: "1", description: "Kitob ID si"})
    @IsInt()
    @IsNotEmpty()
    book_id: number;

    @ApiProperty({example: "https://rasm", description: "Kitobni rasmi"})
    @IsString()
    @IsNotEmpty()
    url: string;
}
