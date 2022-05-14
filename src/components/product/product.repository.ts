import { EntityRepository, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public findAllActives() {
    return this.createQueryBuilder('p')
      .leftJoinAndSelect('p.weeklyProducts', 'pw')
      .leftJoinAndSelect('p.images', 'pi')
      .where('pw.active = :active', { active: true })
      .getMany();
  }

  public async findAllMyProducts(userId: number) {
    return this.createQueryBuilder('p')
      .leftJoinAndSelect('p.weeklyProducts', 'pw')
      .leftJoinAndSelect('p.images', 'pi')
      .where('p.userId = :userId', { userId })
      .getMany();
  }
}
