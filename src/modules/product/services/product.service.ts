import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/prodcut.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';
import { PublicMessages } from 'src/common/enums/messages.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async create(productDto: CreateProductDto) {
    const { title, description, price, summary, categoryId } = productDto;
    const product = this.productRepository.create({
      title,
      description,
      price,
      summary,
      categoryId,
    });
    await this.productRepository.save(product);

    return {
      message: PublicMessages.Created,
    };
  }

  async find() {
    return this.productRepository.find();
  }
}
