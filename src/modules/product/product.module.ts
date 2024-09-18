import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { ProductReviewEntity } from './entities/review.entity';
import { ProductSkuEntity } from './entities/sku.entity';
import { ProductAttributeEntity } from './entities/attribute.entity';
import { ProductAttributeController } from './controllers/attribute.controller';
import { AttributeService } from './services/attribute.service';
import { ReviewService } from './services/review.service';
import { ProductReviewController } from './controllers/review.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../auth/token.service';
import { UserEntity } from '../auth/entities/user.entity';
import { CommentEntity } from './entities/comment.entity';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      ProductReviewEntity,
      ProductSkuEntity,
      ProductAttributeEntity,
      UserEntity,
      CommentEntity,
    ]),
  ],
  controllers: [ProductController, ProductAttributeController, ProductReviewController, CommentController],
  providers: [ProductService, AttributeService, ReviewService, AuthService, TokenService, CommentService, JwtService],
})
export class ProductModule {}
