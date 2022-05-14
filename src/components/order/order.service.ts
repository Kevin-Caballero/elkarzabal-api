import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { OrderProductService } from '../order-product/order-product.service';
import { WeeklyProduct } from '../weekly-product/entities/weekly-product.entity';
import { WeeklyProductService } from '../weekly-product/weekly-product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { SchedulerRegistry } from '@nestjs/schedule';
import { EOrderStatus } from '../order-status/entities/eorder-status';
import { ConfigService } from '@nestjs/config';
import { config } from 'src/config/config';

@Injectable()
export class OrderService {
  constructor(
    private _connection: Connection,
    private _orderRepository: OrderRepository,
    private _weeklyProductService: WeeklyProductService,
    private _orderProductService: OrderProductService,
    private _mailerService: MailerService,
    private _schedulerRegistry: SchedulerRegistry,
    private _configService: ConfigService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const queryRunner = this._connection.createQueryRunner();
    const { orderProducts } = createOrderDto;

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const order = new Order();
      order.userId = createOrderDto.userId;

      const savedOrder = await queryRunner.manager.save<Order>(order);

      for (let i = 0; i < orderProducts.length; i++) {
        orderProducts[i].orderId = savedOrder.id;
        const orderProduct = await this._orderProductService.create(
          orderProducts[i],
          queryRunner,
        );

        const weeklyProduct = await this._weeklyProductService.findOne({
          where: { id: orderProduct.weeklyProductId },
        });

        await queryRunner.manager.update(WeeklyProduct, weeklyProduct.id, {
          currentQuantity:
            weeklyProduct.currentQuantity - orderProduct.quantity,
        });
      }

      await queryRunner.commitTransaction();

      const detailedOrder = await this._orderRepository.findDetailedOrderById(
        savedOrder.id,
      );

      this.sendOrderMail(detailedOrder);
      this.cancelOrderTimeout(savedOrder.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(status?: EOrderStatus) {
    if (status && Object.values(EOrderStatus).includes(+status)) {
      return this._orderRepository.findDetailedOrders(status);
    }
    return this._orderRepository.findDetailedOrders();
  }

  findOne(id: number) {
    return this._orderRepository.findOne({
      where: { id: id },
      relations: ['orderProducts'],
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this._orderRepository.update(id, updateOrderDto);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  //an hour of margin to accept the order
  cancelOrderTimeout(
    orderId: number,
    milliseconds: number = 1000 * 60 * 60 * 24,
  ) {
    const callback = async () => {
      //get order by id
      const order = await this._orderRepository.findDetailedOrderById(orderId);

      if (order.statusId === EOrderStatus.ACCEPTED) {
        return;
      } else {
        //change order status
        this.update(orderId, {
          statusId: EOrderStatus.CANCELLED,
        });

        //refill products quantity
        order.orderProducts.forEach((op) => {
          this._weeklyProductService.update(op.weeklyProductId, {
            currentQuantity:
              op.weeklyProduct.currentQuantity + Number(op.quantity),
          });
        });
      }
    };

    const timeout = setTimeout(callback, milliseconds);
    this._schedulerRegistry.addTimeout(`order${orderId}`, timeout);
  }

  async findOneDetailed(orderId: number) {
    const detailedOrder = await this._orderRepository.findDetailedOrderById(
      orderId,
    );
    delete detailedOrder.user.password;
    return detailedOrder;
  }

  private sendOrderMail(detailedOrder: Order) {
    const orderTotal = detailedOrder.orderProducts.reduce(
      (total, orderProduct) =>
        total + orderProduct.quantity * orderProduct.weeklyProduct.price,
      0,
    );

    this._mailerService
      .sendMail({
        to: 'test@nestjs.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: './src/templates/order-mail.hbs',
        context: {
          user: detailedOrder.user,
          orderProducts: detailedOrder.orderProducts,
          total: orderTotal,
          buttonUrl: `${this._configService.get(
            config.api.host,
          )}/validateOrder.html`,
        },
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((e) => {
        console.log('mail not sent', e);
      });
  }
}
