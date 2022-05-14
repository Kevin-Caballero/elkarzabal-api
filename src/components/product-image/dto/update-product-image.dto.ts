import { IsNumber } from 'class-validator';

export class UpdateProductImageDto {
  @IsNumber()
  id: number;
}
