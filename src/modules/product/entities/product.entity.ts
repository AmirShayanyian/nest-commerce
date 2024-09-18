import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, UpdateDateColumn } from 'typeorm';
import { ProductAttributeEntity } from './attribute.entity';
import { ProductSkuEntity } from './sku.entity';
import { ProductReviewEntity } from './review.entity';
import { CartItemEntity } from 'src/modules/cart/entities/cart-item.entity';

@Entity(EntityName.Product)
export class ProductEntity extends BaseEntity {
  @Column({ length: 75, nullable: false })
  title: string;

  // pictures will be a different table and would
  // store the picture path and the productId with it

  @Column({ length: 200, nullable: true })
  summary: string;

  @Column({ nullable: false })
  description: string;

  @Column('numeric', { nullable: false })
  price: number;

  @Column({ nullable: false })
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;

  @OneToMany(() => ProductAttributeEntity, (attribute) => attribute.product)
  attributes: ProductAttributeEntity[];

  @OneToMany(() => ProductSkuEntity, (product_sku) => product_sku.product)
  product_skus: ProductSkuEntity[];

  @OneToMany(() => ProductReviewEntity, (product_review) => product_review.product)
  product_reviews: ProductReviewEntity[];

  @OneToOne(() => CartItemEntity, (cart_item) => cart_item.products)
  cart_item: CartItemEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
