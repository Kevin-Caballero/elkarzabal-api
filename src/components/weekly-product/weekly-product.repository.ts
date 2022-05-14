import { EntityRepository, Repository } from 'typeorm';
import { WeeklyProduct } from './entities/weekly-product.entity';

@EntityRepository(WeeklyProduct)
export class WeeklyProductRepository extends Repository<WeeklyProduct> {}
