import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ERole } from 'src/components/role/entities/erole';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(9, 9)
  phone: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  // @Length(40) //uncomment when SHA1 is enabled
  password: string;

  @ApiProperty({ enum: ERole })
  @IsNotEmpty()
  @IsEnum(ERole, {
    message: `Value must be between 1 and ${
      Object.keys(ERole).length / 2
    }. Possible roles are: ${Object.keys(ERole)
      .filter((role, i) => i >= Object.keys(ERole).length / 2)
      .map((roleName) => `(${ERole[roleName]} - ${roleName})`)
      .join(', ')}`,
  })
  roleId: ERole;

  @ApiProperty({ required: false })
  @IsOptional()
  group?: string;

  @ApiProperty({ required: false })
  @Length(3, 3)
  @IsOptional()
  language?: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  active?: boolean;

  @IsNotEmpty()
  @IsString()
  address: string;
}
