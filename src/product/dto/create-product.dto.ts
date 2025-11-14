import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, IsNumber } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({
        example: 'Laptop',
        description: 'Unique name of the product',
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @ApiProperty({
        example: 'A powerful gaming laptop with 16GB RAM and RTX GPU',
        description: 'Detailed description of the product',
    })
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 1200.5,
        description: 'Price of the product in USD',
    })
    price: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Available',
        description: 'Status of the product (e.g., Available, Out of stock)',
    })
    status: string;
}
