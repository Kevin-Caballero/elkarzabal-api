import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from 'src/components/role/entities/role.entity';
import { ERole } from 'src/components/role/entities/erole';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        new Role(ERole[ERole.ADMIN]),
        new Role(ERole[ERole.VENDOR]),
        new Role(ERole[ERole.CUSTOMER]),
      ])
      .execute();
  }
}
