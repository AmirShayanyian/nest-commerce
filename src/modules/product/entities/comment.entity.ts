import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProductReviewEntity } from './review.entity';

@Entity(EntityName.Comment)
export class CommentEntity extends BaseEntity {
  @Column()
  text: string;

  @Column()
  approved: boolean;

  @Column()
  reviewId: number;

  @ManyToOne(() => ProductReviewEntity, (review) => review.comments, { onDelete: 'CASCADE' })
  review: ProductReviewEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.children, { onDelete: 'CASCADE' })
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  children: CommentEntity;
}
