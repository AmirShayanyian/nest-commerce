import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { UserEntity } from 'src/modules/auth/entities/user.entity';
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, UpdateDateColumn } from 'typeorm';
import { CartItemEntity } from './cart-item.entity';

@Entity(EntityName.Cart)
export class CartEntity extends BaseEntity {
  @Column({ default: 0 })
  total: number;

  @Column()
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.cart)
  user: UserEntity;

  @OneToMany(() => CartItemEntity, (item) => item.cart)
  items: CartItemEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
