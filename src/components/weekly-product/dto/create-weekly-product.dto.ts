import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateWeeklyProductDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  maxQuantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  minQuantity?: number;
}
