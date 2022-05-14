import { ProductImage } from 'src/components/product-image/entities/product-image.entity';
import { User } from 'src/components/user/entities/user.entity';
import { WeeklyProduct } from 'src/components/weekly-product/entities/weekly-product.entity';
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
export class Product extends BaseEntity {
  //PROPERTIES______________________________________________________________________________________
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'measurement_unit', length: 10 })
  measurementUnit: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

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

  @OneToMany(() => WeeklyProduct, (weeklyProduct) => weeklyProduct.product, {
    onDelete: 'CASCADE',
  })
  weeklyProducts: WeeklyProduct[];

  @OneToMany(() => ProductImage, (productImages) => productImages.product, {
    onDelete: 'CASCADE',
  })
  images: ProductImage[];

  //METHODS_________________________________________________________________________________________
  constructor(
    name: string,
    userId: number,
    measurementUnit: string,
    description: string,
  ) {
    super();
    this.name = name;
    this.userId = userId;
    this.measurementUnit = measurementUnit;
    this.description = description;
  }
}
