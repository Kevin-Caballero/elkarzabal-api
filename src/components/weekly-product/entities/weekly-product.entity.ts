import { OrderProduct } from 'src/components/order-product/entities/order-product.entity';
import { Product } from 'src/components/product/entities/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class WeeklyProduct extends BaseEntity {
  //PROPERTIES______________________________________________________________________________________
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({
    name: 'min_quantity',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  minQuantity: number;

  @Column({ name: 'max_quantity', type: 'decimal', precision: 5, scale: 2 })
  maxQuantity: number;

  @Column({ name: 'current_quantity' })
  currentQuantity: number;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'active', default: true })
  active: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  //FOREIGN KEYS____________________________________________________________________________________
  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];
}
