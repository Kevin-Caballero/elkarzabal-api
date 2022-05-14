import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { OrderProductModule } from '../order-product/order-product.module';
import { WeeklyProductModule } from '../weekly-product/weekly-product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    OrderProductModule,
    WeeklyProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
