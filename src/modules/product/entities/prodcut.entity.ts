import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

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

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
