import { ApiBodyOptions } from '@nestjs/swagger';
import { UserLogin } from 'src/components/user/entities/user-login';

export namespace OpenApiBody {
  export const loginBody: ApiBodyOptions = {
    description: 'User credentials',
    required: true,
    isArray: false,
    type: UserLogin,
  };
}
