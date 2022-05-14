import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductController } from './order-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductRepository } from './order-product.repository';
import { WeeklyProductModule } from '../weekly-product/weekly-product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderProductRepository]),
    WeeklyProductModule,
  ],
  controllers: [OrderProductController],
  providers: [OrderProductService],
  exports: [OrderProductService],
})
export class OrderProductModule {}
