import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ProductReviewEntity } from './review.entity';
import { UserEntity } from 'src/modules/auth/entities/user.entity';

@Entity(EntityName.Comment)
export class CommentEntity extends BaseEntity {
  @Column()
  text: string;

  @Column({ default: true })
  approved: boolean;

  @Column()
  reviewId: number;

  @Column()
  authorId: number;

  @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => ProductReviewEntity, (review) => review.comments, { onDelete: 'CASCADE' })
  review: ProductReviewEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.children, { onDelete: 'CASCADE' })
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  children: CommentEntity;
}
