import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
