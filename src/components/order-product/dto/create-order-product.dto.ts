import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  @IsNumber()
  weeklyProductId: number;

  @IsOptional()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
