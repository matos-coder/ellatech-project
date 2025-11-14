import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class AdjustProductDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsInt() // It must be a whole number
  @IsNotEmpty()
  quantity: number;
}