import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { config } from 'src/config/config';
import { ProductImageRepository } from './product-image.repository';

@Injectable()
export class ProductImageService {
  constructor(
    private readonly productImagesRepository: ProductImageRepository,
    private readonly configService: ConfigService,
  ) {}

  createOne(createProductImageDto: CreateProductImageDto) {
    return this.productImagesRepository.save(createProductImageDto);
  }

  create(
    createProductImageDto: CreateProductImageDto,
    files: Array<Express.Multer.File>,
  ) {
    return this.persistImages(files, +createProductImageDto.productId);
  }

  findAll() {
    return `This action returns all productImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productImage`;
  }

  async update(id: number, file: Express.Multer.File) {
    const dbImage = await this.productImagesRepository.findOne({
      where: { id: id },
    });

    const filePath = `./${this.configService.get(
      config.api.api_static_folder,
    )}/${dbImage.filename}`;

    fs.writeFileSync(filePath, file.buffer);

    return dbImage;
  }

  async remove(id: number) {
    const image = await this.productImagesRepository.findOne({ where: { id } });
    try {
      fs.unlinkSync(
        `./${this.configService.get(config.api.api_static_folder)}/${
          image.filename
        }`,
      );
    } catch (error) {
      throw new BadRequestException(`There is no image with id #${id}`);
    }

    return image.remove();
  }

  persistImages(files: Array<Express.Multer.File>, productId: number) {
    return Promise.all(
      files.map(async (f) => {
        const fileExtension: string = f.originalname.split('.').pop();
        const generatedName: string = (Math.random() + 1)
          .toString(36)
          .substring(2);

        const filename = `${generatedName}.${fileExtension}`;
        const filePath = `./${this.configService.get(
          config.api.api_static_folder,
        )}/${generatedName}.${fileExtension}`;

        try {
          fs.writeFileSync(filePath, f.buffer);
        } catch (error) {
          throw new BadRequestException(error);
        }

        const imageDto: CreateProductImageDto = {
          filename: filename,
          productId: productId,
        };

        return this.createOne(imageDto);
      }),
    );
  }
}
