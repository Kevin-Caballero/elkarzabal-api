import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductImageDto {
  @IsNotEmpty()
  productId: number;

  @IsString()
  filename?: string;
}
