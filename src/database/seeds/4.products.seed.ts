import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Product } from 'src/components/product/entities/product.entity';

export default class CreateProducts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values([
        new Product('Pimiento', 2, 'Ud', 'es un pimiento'),
        new Product('Zanahoria', 2, 'g', 'es una zanahoria'),
        new Product('Patata', 2, 'Kg', 'es una patata'),
        new Product('Nabo', 2, 'Kg', 'es un nabo'),
        new Product('Lechuga', 2, 'Ud', 'es una lechuga'),
        new Product('Coliflor', 2, 'Ud', 'es una colifrol'),
        new Product('Manzana', 2, 'Kg', 'es una manzana'),
        new Product('Limon', 2, 'Kg', 'es un limon'),
        new Product('Pepino', 2, 'Ud', 'es una pepino'),
        new Product('Champi', 2, 'Kg', 'es una campi'),
        new Product('Queso', 2, 'Ud', 'es una queso'),
      ])
      .execute();
  }
}
