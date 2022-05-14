import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/decorators/role.decorator';
import { ERole } from '../role/entities/erole';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PRODUCT')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @Roles(ERole.VENDOR)
  create(
    @Request() req,
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    createProductDto.userId = req.user.id;
    return this.productService.create(createProductDto, files);
  }

  //GET ACTIVE PRODUCTS
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  //GET BASE PRODUCT(WITHOUT RELATIONS)
  @Get('base')
  findAllBaseProducts() {
    return this.productService.findAllBaseProduct();
  }

  @Get('mine')
  findAllMyProducts(@Request() req) {
    return this.productService.findAllMyProducts(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne({
      where: { id: +id },
      relations: ['images'],
    });
  }

  @Patch(':id')
  @Roles(ERole.VENDOR)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Roles(ERole.VENDOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
