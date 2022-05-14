import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { EOrderStatus } from '../order-status/entities/eorder-status';
import { Order } from './entities/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  findDetailedOrderById(orderId: number) {
    return this.findOne({
      where: { id: orderId },
      relations: [
        'user',
        'orderProducts',
        'orderProducts.weeklyProduct',
        'orderProducts.weeklyProduct.product',
      ],
    });
  }

  findDetailedOrders(status?: EOrderStatus) {
    const options: FindManyOptions = {
      where: { statusId: status },
      relations: [
        'user',
        'orderProducts',
        'orderProducts.weeklyProduct',
        'orderProducts.weeklyProduct.product',
      ],
    };
    if (!status) delete options.where;
    return this.find(options);
  }
}
