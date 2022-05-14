import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindOneOptions } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { ProductImageService } from '../product-image/product-image.service';
import { config } from 'src/config/config';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly configService: ConfigService,
    private readonly productImageService: ProductImageService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    files: Array<Express.Multer.File>,
  ) {
    const savedProduct = await this.productRepository.save(createProductDto);
    await this.productImageService.persistImages(files, savedProduct.id);
    const product = await this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ['images'],
    });
    return {
      ...product,
      images: product.images.map((pi) => ({
        ...pi,
        filename: this.getUrlFromFilename(pi.filename),
      })),
    };
  }

  async findAll() {
    const products = await this.productRepository.findAllActives();
    return products.map((p) => ({
      ...p,
      images: p.images.map((pi) => this.getUrlFromFilename(pi.filename)),
    }));
  }

  async findAllBaseProduct() {
    const products = await this.productRepository.find({
      relations: ['images'],
    });

    return products.map((p) => ({
      ...p,
      images: p.images.map((pi) => this.getUrlFromFilename(pi.filename)),
    }));
  }

  async findAllMyProducts(userId: number) {
    const products = await this.productRepository.findAllMyProducts(userId);

    return products.map((p) => ({
      ...p,
      images: p.images.map((pi) => ({
        ...pi,
        filename: this.getUrlFromFilename(pi.filename),
      })),
    }));
  }

  async findOne(findOneOptions: FindOneOptions) {
    const product = await this.productRepository.findOne(findOneOptions);
    return {
      ...product,
      images: product.images.map((pi) => ({
        ...pi,
        filename: this.getUrlFromFilename(pi.filename),
      })),
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!productToUpdate.id)
      throw new BadRequestException(`There is no product with id #${id}`);

    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOne({
      where: { id: id },
      relations: ['images'],
    });

    return {
      ...updatedProduct,
      images: updatedProduct.images?.map((pi) => ({
        ...pi,
        filename: this.getUrlFromFilename(pi.filename),
      })),
    };
  }

  async remove(id: number) {
    const productToDelete = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!productToDelete.id) {
      return `There is no product with id #${id}`;
    } else {
      await this.productRepository.delete(id);
      return `The product with the id #${id} was removed`;
    }
  }

  getUrlFromFilename(filename: string) {
    return `${this.configService.get(
      config.api.protocol,
    )}://${this.configService.get(config.api.host)}:${this.configService.get(
      config.api.port,
    )}/${this.configService.get(config.api.api_static_folder)}/${filename}`;
  }
}
