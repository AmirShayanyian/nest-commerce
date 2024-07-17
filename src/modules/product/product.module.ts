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
import { ReviewService } from './services/review.service';
import { ProductReviewController } from './controllers/review.controller';

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
  controllers: [ProductController, ProductAttributeController, ProductReviewController],
  providers: [ProductService, AttributeService, ReviewService],
})
export class ProductModule {}
