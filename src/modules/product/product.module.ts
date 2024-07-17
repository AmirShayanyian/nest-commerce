import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/prodcut.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { ProductReviewEntity } from './entities/review.entity';
import { ProductSkuEntity } from './entities/sku.entity';
import { ProductAttributeEntity } from './entities/attribute.entity';
import { ProductAttributeController } from './controllers/attribute.controller';
import { AttributeService } from './services/attribute.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      ProductReviewEntity,
      ProductSkuEntity,
      ProductAttributeEntity,
    ]),
  ],
  controllers: [ProductController, ProductAttributeController],
  providers: [ProductService, AttributeService],
})
export class ProductModule {}
