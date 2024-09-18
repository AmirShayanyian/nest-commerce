import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { CommentEntity } from 'src/modules/product/entities/comment.entity';
import { ProductReviewEntity } from 'src/modules/product/entities/review.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  @Column({ nullable: true, length: 30 })
  first_name: string;

  @Column({ nullable: true, length: 30 })
  last_name: string;

  @Column({ unique: true, length: 30 })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, length: 50 })
  email: string;

  @OneToOne(() => CartEntity, (cart) => cart.user)
  @JoinColumn()
  cart: CartEntity;

  @OneToMany(() => ProductReviewEntity, (review) => review.author)
  reviews: ProductReviewEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
