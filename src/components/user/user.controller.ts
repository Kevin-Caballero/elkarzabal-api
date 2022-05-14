import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators/role.decorator';
import { ERole } from '../role/entities/erole';
import { User } from './entities/user.entity';
import { FindOneOptions } from 'typeorm';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OpenApiResponse } from 'src/open-api/swagger/response';
import { OpenApiSummary } from 'src/open-api/swagger/summary';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse(OpenApiResponse.USERgetAllOk)
  @ApiResponse(OpenApiResponse.APPgenericUnauthorized)
  @ApiOperation({ summary: OpenApiSummary.getAllUsers })
  @Roles(ERole.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile')
  @ApiResponse(OpenApiResponse.USERprofileOk)
  @ApiResponse(OpenApiResponse.APPgenericUnauthorized)
  @ApiOperation({ summary: OpenApiSummary.profile })
  findOne(@Request() req) {
    const user: User = req.user;
    const queryOptions: FindOneOptions = {
      where: { id: req.user.id },
      relations: ['role'],
    };
    switch (user.roleId) {
      case ERole.CUSTOMER:
        queryOptions.relations.push('orders');
        break;
      case ERole.VENDOR:
        queryOptions.relations.push('products');
        break;
    }
    return this.userService.findOne(queryOptions);
  }

  @Patch()
  @ApiOperation({ summary: OpenApiSummary.patchUser })
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @Delete()
  @ApiOperation({ summary: OpenApiSummary.deactivateUser })
  remove(@Request() req) {
    return this.userService.update(req.user.id, { active: false });
  }

  @Delete(':id')
  @ApiOperation({ summary: OpenApiSummary.deactivateUserById })
  @Roles(ERole.ADMIN)
  removeById(@Param('id') id: string) {
    return this.userService.update(+id, { active: false });
  }

  @Patch('reactivate/:id')
  @ApiOperation({ summary: OpenApiSummary.reactivateUser })
  @Roles(ERole.ADMIN)
  reactivate(@Param('id') id: string) {
    return this.userService.update(+id, { active: true });
  }
}
