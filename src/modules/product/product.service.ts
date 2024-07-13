import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/prodcut.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async create(productDto: CreateProductDto) {
    const { title, description, price, summary } = productDto;
    const product =  this.productRepository.create({
      title,
      description,
      price,
      summary,
    });
    await this.productRepository.save(product);
  }
}
