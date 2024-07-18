import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProductEntity } from './prodcut.entity';
import { BaseEntity } from 'src/common/abstracts/base.entity';
import { UserEntity } from 'src/modules/auth/entities/user.entity';
import { CommentEntity } from './comment.entity';

@Entity(EntityName.ProductReview)
export class ProductReviewEntity extends BaseEntity {
  @Column()
  text: string;

  @Column({ type: 'double' })
  rating: number;

  @Column()
  upVote: number;

  @Column()
  downVote: number;

  @Column()
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_reviews, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.review)
  comments: CommentEntity[];

  @Column()
  authorId: number;

  @ManyToOne(() => UserEntity, (user) => user.reviews, { onDelete: 'CASCADE' })
  author: UserEntity;
}
