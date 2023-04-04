import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @ApiProperty({example: "O'tgan kunlar", description: "Kitob nomi"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "Diniy", description: "Kitobning turi"})
    @IsString()
    @IsNotEmpty()
    book_type: string;

    @ApiProperty({example: "Uzbek", description: "Kitobning tili"})
    @IsString()
    @IsNotEmpty()
    language: string;

    @ApiProperty({example: "2023", description: "Kitob chop etilgan sana"})
    @IsString()
    @IsNotEmpty()
    created_at: string;

    @ApiProperty({example: "1", description: "Kitob mualifi ID si"})
    author_id: number;

    @ApiProperty({example: "Bu kito zo'q", description: "Kitob uchun ma'lumot"})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({example: "true || false", description: "Kitob elektiron ktob yoki yo'qligi"})
    @IsNotEmpty()
    e_book: boolean;
}
