import { ApiProperty } from '@nestjs/swagger';

export class UserLogin {
  @ApiProperty({ type: String, default: '' })
  email: string;
  @ApiProperty({ type: String, default: '' })
  password: string;
}
