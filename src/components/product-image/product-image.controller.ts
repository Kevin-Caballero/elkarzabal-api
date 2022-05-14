import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/role.decorator';
import { ERole } from '../role/entities/erole';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { ProductImageService } from './product-image.service';

@Controller('product-image')
export class ProductImageController {
  constructor(private productImageService: ProductImageService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @Roles(ERole.VENDOR)
  create(
    @Request() req,
    @Body() createProductImageDto: CreateProductImageDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.productImageService.create(createProductImageDto, files);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(ERole.VENDOR)
  update(
    @Param('id') id: number,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.productImageService.update(id, file);
  }

  @Delete(':id')
  @Roles(ERole.VENDOR)
  remove(@Param('id') id: number) {
    return this.productImageService.remove(id);
  }
}
