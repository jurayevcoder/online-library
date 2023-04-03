import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {
    @ApiProperty({example: "Davlat Jo'rayev", description: "Mualifning to'liq ismi"})
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({example: "https://rasm", description: "Mualifning rasmi"})
    @IsString()
    @IsNotEmpty()
    image_path: string;

    @ApiProperty({example: "about", description: "Mualif haqida ma'lumotlar"})
    @IsString()
    @IsNotEmpty()
    about: string;
}
