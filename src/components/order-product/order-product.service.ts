import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';
import { WeeklyProductService } from '../weekly-product/weekly-product.service';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { OrderProduct } from './entities/order-product.entity';
import { OrderProductRepository } from './order-product.repository';

@Injectable()
export class OrderProductService {
  constructor(
    private _connection: Connection,
    private readonly orderProductRepository: OrderProductRepository,
    private readonly weeklyProductService: WeeklyProductService,
  ) {}

  async create(
    createOrderProductDto: CreateOrderProductDto,
    queryRunner: QueryRunner,
  ) {
    const existsStockToBuy = await this.weeklyProductService.existsStockToBuy(
      createOrderProductDto.weeklyProductId,
      createOrderProductDto.quantity,
    );

    if (!existsStockToBuy) {
      throw new BadRequestException(
        'The required quantity is higher than the existing quantity of the product',
      );
    } else {
      const orderProduct = new OrderProduct();
      orderProduct.orderId = createOrderProductDto.orderId;
      orderProduct.quantity = createOrderProductDto.quantity;
      orderProduct.weeklyProductId = createOrderProductDto.weeklyProductId;

      return queryRunner.manager.save<OrderProduct>(orderProduct);
    }
  }

  findAll() {
    return `This action returns all orderProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderProduct`;
  }

  update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    return `This action updates a #${id} orderProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderProduct`;
  }
}
