import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, UpdateDateColumn } from 'typeorm';
import { CartEntity } from './cart.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { ProductSkuEntity } from 'src/modules/product/entities/sku.entity';

@Entity(EntityName.CartItem)
export class CartItemEntity extends BaseEntity {
  @Column()
  cartId: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: CartEntity;

  @Column()
  productId: number;

  @OneToMany(() => ProductEntity, (product) => product.cart_item)
  @JoinColumn()
  products: ProductEntity;

  @Column()
  skuId: number;

  @OneToMany(() => ProductSkuEntity, (p_sku) => p_sku.cart_item)
  @JoinColumn()
  skus: ProductSkuEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
