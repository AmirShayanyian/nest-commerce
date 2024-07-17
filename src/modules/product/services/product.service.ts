import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/prodcut.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { NotFoundMessages, PublicMessages } from 'src/common/enums/messages.enum';
import { UpdateProductDto } from '../dtos/product/update-product.dto';

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
    return this.productRepository.find({
      relations: {
        attributes: true,
        product_reviews: {
          author: true,
        },
      },
      select: {
        title: true,
        description: true,
        price: true,
        summary: true,
        attributes: {
          key: true,
          value: true,
        },
        product_reviews: {
          text: true,
          rating: true,
          author: {
            username: true,
          },
        },
      },
    });
  }

  async findById(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(NotFoundMessages.ProductNotFound);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { title, description, price, summary } = updateProductDto;
    await this.productRepository.update({ id }, { title, description, price, summary });
    return { message: PublicMessages.Updated };
  }
  async remove(id: number) {
    await this.findById(id);
    await this.productRepository.delete({ id });
    return { message: PublicMessages.Deleted };
  }
}
