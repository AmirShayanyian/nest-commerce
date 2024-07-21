import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { UserEntity } from 'src/modules/auth/entities/user.entity';
import { Column, CreateDateColumn, Entity, OneToOne, UpdateDateColumn } from 'typeorm';

@Entity(EntityName.Cart)
export class CartEntity extends BaseEntity {
  @Column()
  total: number;

  @Column()
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.cart)
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
