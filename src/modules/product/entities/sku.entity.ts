import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity(EntityName.ProductSku)
export class ProductSkuEntity extends BaseEntity {
  @Column()
  sku: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  size: string;

  @Column()
  color: string;

  // @Column()
  // images: string[];

  @ManyToOne(() => ProductEntity, (product) => product.product_skus, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
