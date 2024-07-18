import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity(EntityName.Category)
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];
  @ManyToOne(() => CategoryEntity, (category) => category.children)
  parent: CategoryEntity;
}
