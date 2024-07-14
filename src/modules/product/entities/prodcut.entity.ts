import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from 'typeorm';
import { AttributeEntity } from './attribute.entity';
import { ProductSkuEntity } from './sku.entity';

@Entity(EntityName.Product)
export class ProductEntity extends BaseEntity {
  @Column()
  title: string;

  // pictures will be a different table and would
  // store the picture path and the productId with it

  @Column()
  summary: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;

  @OneToMany(() => AttributeEntity, (attribute) => attribute.product)
  attributes: AttributeEntity[];

  @OneToMany(() => ProductSkuEntity, (product_sku) => product_sku.product)
  product_skus: ProductSkuEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
