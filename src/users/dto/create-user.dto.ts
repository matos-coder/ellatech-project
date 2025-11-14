import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({ example: 'Matias', description: 'User full name' })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'matias@test.com', description: 'User email address' })
    email: string;
}
