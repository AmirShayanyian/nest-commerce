import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';
import { BaseEntity } from 'src/common/abstracts/base.entity';
import { UserEntity } from 'src/modules/auth/entities/user.entity';
import { CommentEntity } from './comment.entity';

@Entity(EntityName.ProductReview)
export class ProductReviewEntity extends BaseEntity {
  @Column({ nullable: true, default: '' })
  text: string;

  @Column({ type: 'double', nullable: true })
  rating: number;

  @Column({ default: 0 })
  upVote: number;

  @Column({ default: 0 })
  downVote: number;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_reviews, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.review)
  comments: CommentEntity[];

  @Column({ nullable: true })
  authorId: number;


  @ManyToOne(() => UserEntity, (user) => user.reviews, { onDelete: 'CASCADE' })
  author: UserEntity;
}
