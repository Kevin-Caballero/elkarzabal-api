import { Module } from '@nestjs/common';
import { WeeklyProductService } from './weekly-product.service';
import { WeeklyProductController } from './weekly-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeeklyProductRepository } from './weekly-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WeeklyProductRepository])],
  controllers: [WeeklyProductController],
  providers: [WeeklyProductService],
  exports: [WeeklyProductService],
})
export class WeeklyProductModule {}
