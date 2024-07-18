import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { NotFoundMessages, PublicMessages } from 'src/common/enums/messages.enum';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async create(productDto: CreateProductDto) {
    const { title, description, price, summary, categoryId } = productDto;
    // const product = this.productRepository.create({
    //   title,
    //   description,
    //   price,
    //   summary,
    //   categoryId,
    // });
    // await this.productRepository.save(product);
    const query = `INSERT INTO 
    product (title,description,price,summary,categoryId)
     VALUES (?,?,?,?,?)
    `;
    await this.productRepository.query(query, [title, description, price, summary, categoryId]);
    return {
      message: PublicMessages.Created,
    };
  }

  async find(paginationDto: PaginationDto) {
    const { limit, page, skip } = paginationSolver(paginationDto);
    const [products, count] = await this.productRepository.findAndCount({
      skip,
      take: limit,
      relations: {
        attributes: true,
        product_reviews: {
          author: true,
        },
      },
      relationLoadStrategy: 'join',
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        summary: true,
        attributes: {
          id: true,
          key: true,
          value: true,
        },
        product_reviews: {
          upVote: true,
          downVote: true,
          text: true,
          rating: true,
          author: {
            id: true,
            username: true,
          },
        },
      },
    });
    return {
      pagination: paginationGenerator(count, page, limit),
      products,
    };
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
