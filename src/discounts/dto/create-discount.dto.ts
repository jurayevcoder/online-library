import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateDiscountDto {
    @ApiProperty({example: "Navroz", description: "Chegirma nomi"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "50", description: "Chegirma foizi"})
    @IsInt()
    @IsNotEmpty()
    number_percentage: number;

    @ApiProperty({example: "2023-05-20", description: "Chegirma boshlanish sanasi"})
    @IsNotEmpty()
    start_date: Date;

    @ApiProperty({example: "2023-05-25", description: "Chegirma tugash sanasi"})
    @IsNotEmpty()
    finish_date: Date;
}
