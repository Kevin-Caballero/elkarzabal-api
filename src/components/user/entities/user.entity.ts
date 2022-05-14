import { Order } from 'src/components/order/entities/order.entity';
import { Product } from 'src/components/product/entities/product.entity';
import { Role } from 'src/components/role/entities/role.entity';
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
export class User extends BaseEntity {
  //PROPERTIES______________________________________________________________________________________
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', length: 50 })
  name: string;

  @Column({ name: 'lastname', length: 50 })
  lastname: string;

  @Column({ name: 'phone', length: 9 })
  phone: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password', length: 40 })
  password: string;

  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'group', length: 20, nullable: true })
  group: string;

  @Column({ name: 'language', length: 3, default: 'ESP' })
  language: string;

  @Column({ name: 'active', default: true })
  active: boolean;

  @Column({ name: 'address' })
  address: string;

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
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  // @OneToMany(() => Address, (address) => address.user, { onDelete: 'CASCADE' })
  // addresses: Address[];

  @OneToMany(() => Product, (product) => product.user, { onDelete: 'CASCADE' })
  products: Product[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  //METHODS_________________________________________________________________________________________
  constructor(
    name: string,
    lastname: string,
    phone: string,
    email: string,
    password: string,
    roleId: number,
    language: string,
    address: string,
    group?: string,
  ) {
    super();
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.language = language;
    this.address = address;
    this.group = group;
  }
}
