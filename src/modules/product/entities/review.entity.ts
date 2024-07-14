import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { ProductEntity } from './prodcut.entity';

@Entity(EntityName.ProductReview)
export class ProductReviewEntity {
  @Column()
  text: string;

  @Column()
  rating: number;

  @Column()
  productId: number;

  @OneToMany(() => ProductEntity, (product) => product.product_reviews, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @Column()
  userId: number;
}
