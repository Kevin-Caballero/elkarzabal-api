import { ProductImage } from 'src/components/product-image/entities/product-image.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateProductsImages implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(ProductImage)
      .values([
        new ProductImage(1, 'pimiento.jpg'),
        new ProductImage(2, 'zanahoria.jpg'),
        new ProductImage(3, 'patata.jpg'),
        new ProductImage(4, 'nabo.jpg'),
        new ProductImage(5, 'lechuga.jpg'),
        new ProductImage(6, 'coliflor.jpg'),
        new ProductImage(7, 'manzana.jpg'),
        new ProductImage(8, 'limon.jpg'),
        new ProductImage(9, 'pepino.jpg'),
        new ProductImage(10, 'champi.jpg'),
        new ProductImage(11, 'queso.jpg'),
      ])
      .execute();
  }
}
