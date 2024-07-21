import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, UpdateDateColumn } from 'typeorm';
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

  @OneToOne(() => ProductEntity, (product) => product.cart_item)
  @JoinColumn()
  product: ProductEntity;

  @Column()
  skuId: number;

  @OneToOne(() => ProductSkuEntity, (p_sku) => p_sku.cart_item)
  @JoinColumn()
  sku: ProductSkuEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
