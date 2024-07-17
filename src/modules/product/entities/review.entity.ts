import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ProductEntity } from './prodcut.entity';
import { BaseEntity } from 'src/common/abstracts/base.entity';
import { UserEntity } from 'src/modules/auth/entities/user.entity';

@Entity(EntityName.ProductReview)
export class ProductReviewEntity extends BaseEntity {
  @Column()
  text: string;

  @Column({ type: 'double' })
  rating: number;

  @Column()
  productId: number;

  @OneToMany(() => ProductEntity, (product) => product.product_reviews, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @Column()
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.review)
  @JoinColumn()
  author: UserEntity;
}
