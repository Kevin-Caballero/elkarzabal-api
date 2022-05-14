import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { OrderStatus } from 'src/components/order-status/entities/order-status.entity';
import { EOrderStatus } from 'src/components/order-status/entities/eorder-status';

export default class CreateOrderStatus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(OrderStatus)
      .values([
        { name: EOrderStatus[EOrderStatus.PENDING] },
        { name: EOrderStatus[EOrderStatus.ACCEPTED] },
        { name: EOrderStatus[EOrderStatus.CANCELLED] },
      ])
      .execute();
  }
}
