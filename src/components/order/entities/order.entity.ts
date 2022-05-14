import { OrderProduct } from 'src/components/order-product/entities/order-product.entity';
import { EOrderStatus } from 'src/components/order-status/entities/eorder-status';
import { OrderStatus } from 'src/components/order-status/entities/order-status.entity';
import { User } from 'src/components/user/entities/user.entity';
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
export class Order extends BaseEntity {
  //PROPERTIES______________________________________________________________________________________
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'status_id', default: EOrderStatus.PENDING })
  statusId: number;

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
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'status_id' })
  orderStatus: OrderStatus;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    onDelete: 'CASCADE',
  })
  orderProducts: OrderProduct[];
}
