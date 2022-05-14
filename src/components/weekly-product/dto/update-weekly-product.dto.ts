import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateWeeklyProductDto } from './create-weekly-product.dto';

export class UpdateWeeklyProductDto extends PartialType(
  CreateWeeklyProductDto,
) {
  @IsNumber()
  currentQuantity: number;
}
