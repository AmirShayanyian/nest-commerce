import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { ProductReviewEntity } from 'src/modules/product/entities/review.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToOne(() => ProductReviewEntity, (review) => review.author)
  review: ProductReviewEntity;
}
