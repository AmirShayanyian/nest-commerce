import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';
import { ProductEntity } from './prodcut.entity';

@Entity(EntityName.ProductAttribute)
export class ProductAttributeEntity extends BaseEntity {
  @Column()
  key: string;

  @Column()
  value: string;

  @Column()
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.attributes, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
