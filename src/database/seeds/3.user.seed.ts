import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from 'src/components/user/entities/user.entity';
import { ERole } from 'src/components/role/entities/erole';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        new User(
          'ADMIN',
          'ADMIN',
          '611111111',
          'admin@admin.com',
          'd033e22ae348aeb5660fc2140aec35850c4da997',
          ERole.ADMIN,
          'ESP',
          'calle ejemplo 123',
        ),
        new User(
          'VENDOR',
          'VENDOR',
          '622222222',
          'vendor@vendor.com',
          '9fdcb2f441fcdd2e24e21bf8d45413ae72c0443c',
          ERole.VENDOR,
          'ESP',
          'calle ejemplo 123',
        ),
        new User(
          'CUSTOMER',
          'CUSTOMER',
          '633333333',
          'customer@customer.com',
          'b39f008e318efd2bb988d724a161b61c6909677f',
          ERole.CUSTOMER,
          'EUS',
          'calle ejemplo 123',
        ),
      ])
      .execute();
  }
}
