import { ApiResponseOptions } from '@nestjs/swagger';

export namespace OpenApiResponse {
  export const APPloginOk: ApiResponseOptions = {
    status: 201,
    description:
      'If the user is registered and account activated returns user + token',
  };

  export const APPregisterOk: ApiResponseOptions = {
    status: 201,
    description: 'User created successfully',
  };

  export const APPloginUnauthorized: ApiResponseOptions = {
    status: 401,
    description:
      'If the user is not registered or account is not activated returns unauthorized',
  };

  export const APPregisterBadRequest: ApiResponseOptions = {
    status: 400,
    description: 'Not fulfilling createUserDTO',
  };

  export const USERprofileOk: ApiResponseOptions = {
    status: 200,
    description: 'Get your current profile data',
  };

  export const USERpatchOk: ApiResponseOptions = {
    status: 200,
    description: 'Get your current profile data',
  };

  export const APPgenericUnauthorized: ApiResponseOptions = {
    status: 400,
    description:
      'If the user is not registered or account is not activated or user profile has not qualified role returns unauthorized',
  };

  export const USERgetAllOk: ApiResponseOptions = {
    status: 200,
    description: 'Get all users',
  };
}
