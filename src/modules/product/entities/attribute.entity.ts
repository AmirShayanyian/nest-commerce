import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';
import { ProductEntity } from './prodcut.entity';

@Entity(EntityName.Attribute)
export class AttributeEntity extends BaseEntity {
  @Column()
  type: string;

  @Column()
  value: string;

  @ManyToOne(() => ProductEntity, (product) => product.attributes, { onDelete: 'CASCADE' })
  product: ProductEntity;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
