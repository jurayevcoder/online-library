import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAdvertisementDto {
    @ApiProperty({example: "Pepsi", description: "Reklama nomi"})
    @IsString()
    @IsNotEmpty()
    product_name: string;

    @ApiProperty({example: "2023-04-04", description: "Reklama boshlash sanasi"})
    @IsNotEmpty()
    start_date: Date;

    @ApiProperty({example: "2023-04-10", description: "Reklama tugash sanasi"})
    @IsNotEmpty()
    finish_date: Date;

    @ApiProperty({example: "2500", description: "Reklama narxi"})
    @IsInt()
    @IsNotEmpty()
    price: number;

    @ApiProperty({example: "1", description: "To'lov turi ID si"})
    @IsInt()
    @IsNotEmpty()
    payment_method_id: number;
}
