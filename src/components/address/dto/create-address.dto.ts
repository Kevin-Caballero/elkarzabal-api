import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Length,
  IsPostalCode,
  IsOptional,
} from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  state: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  street: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPostalCode()
  postal_code: number;
}
