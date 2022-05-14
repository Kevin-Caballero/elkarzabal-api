import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './components/auth/auth.service';
import { LocalAuthGuard } from './components/auth/local-auth.guard';
import { ERole } from './components/role/entities/erole';
import { CreateUserDto } from './components/user/dto/create-user.dto';
import { UserService } from './components/user/user.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/role.decorator';
import { OpenApiBody } from './open-api/swagger/body';
import { OpenApiResponse } from './open-api/swagger/response';
import { OpenApiSummary } from './open-api/swagger/summary';

@ApiTags('APP')
@Controller()
export class AppController {
  constructor(
    private readonly _appService: AppService,
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody(OpenApiBody.loginBody)
  @ApiResponse(OpenApiResponse.APPloginOk)
  @ApiResponse(OpenApiResponse.APPloginUnauthorized)
  @ApiOperation({ summary: OpenApiSummary.login })
  login(@Req() req) {
    return this._authService.login(req.user);
  }

  @Post('register')
  @ApiResponse(OpenApiResponse.APPregisterOk)
  @ApiResponse(OpenApiResponse.APPregisterBadRequest)
  @ApiOperation({ summary: OpenApiSummary.register })
  @Roles(ERole.ADMIN)
  register(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.roleId === ERole.ADMIN)
      throw new BadRequestException(
        ' Possible roles are: (2 - VENDOR), (3 - CUSTOMER)',
      );
    return this._userService.create(createUserDto);
  }
}
