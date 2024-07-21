import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { NotFoundMessages, PublicMessages } from 'src/common/enums/messages.enum';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { paginationSolver } from 'src/common/utils/pagination.util';
import * as qs from 'qs';
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
    // const [products, count] = await this.productRepository.findAndCount({
    //   skip,
    //   take: limit,
    //   relations: {
    //     attributes: true,
    //     product_reviews: {
    //       author: true,
    //     },
    //   },
    //   relationLoadStrategy: 'join',
    //   select: {
    //     id: true,
    //     title: true,
    //     description: true,
    //     price: true,
    //     summary: true,
    //     attributes: {
    //       id: true,
    //       key: true,
    //       value: true,
    //     },
    //     product_reviews: {
    //       upVote: true,
    //       downVote: true,
    //       text: true,
    //       rating: true,
    //       author: {
    //         id: true,
    //         username: true,
    //       },
    //     },
    //   },
    // });

    let query = `
    SELECT 
    p.id,
    p.title,
    p.description,
    p.summary,
    p.price,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'value', pa.value,
        'key', pa.key,
        'productId', pa.productId
      )
    )AS attributes,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'text', pr.text,
        'rating', pr.rating,
        'upVote', pr.upVote,
        'downVote' , pr.downVote,
        'productId', pr.productId,
        'authorId', pr.authorId
      )
    ) AS reviews
    FROM product AS p
    LEFT JOIN product_review AS pr ON (pr.productId = p.id)
    LEFT JOIN product_attribute AS pa ON (pa.productId = p.id)
    GROUP BY p.id, pa.productId , pr.productId
    `;
    const products = await this.productRepository.query(query);
    return products;

    // pagination: paginationGenerator(count, page, limit),
  }

  async findById(id: number) {
    // const product = await this.productRepository.findOneBy({ id });
    let query = `
    SELECT 
    p.id,
    p.title,
    p.description,
    p.summary,
    p.price,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'value', pa.value,
        'key', pa.key,
        'productId', pa.productId
      )
    )AS attributes,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'text', pr.text,
        'rating', pr.rating,
        'upVote', pr.upVote,
        'downVote' , pr.downVote,
        'productId', pr.productId,
        'authorId', pr.authorId
      )
    ) AS reviews
    FROM product AS p
    LEFT JOIN product_review AS pr ON (pr.productId = p.id)
    LEFT JOIN product_attribute AS pa ON (pa.productId = p.id)
    WHERE p.id = ?
    GROUP BY p.id, pa.productId , pr.productId
    `;
    const product = await this.productRepository.query(query, [id]);
    if (!product) {
      throw new NotFoundException(NotFoundMessages.ProductNotFound);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { title, description, price, summary } = updateProductDto;
    let updateQuery = '';
    // await this.productRepository.update({ id }, { title, description, price, summary });
    let query = `
    UPDATE product
    SET FIELDS
    WHERE id = ?
    `;
    let obj = {};
    let parameters = [];
    if (title) {
      if (updateQuery.length > 0) updateQuery += ', title = ?';
      else updateQuery += 'title=?';
      parameters.push(title);
    }
    if (description) {
      if (updateQuery.length > 0) updateQuery += ', description = ?';
      else updateQuery += 'description=?';
      parameters.push(description);
    }
    if (summary) {
      if (updateQuery.length > 0) updateQuery += ', summary = ?';
      else updateQuery += 'summary=?';
      parameters.push(summary);
    }
    if (description) {
      if (updateQuery.length > 0) updateQuery += ', price = ?';
      else updateQuery += 'price=?';
      parameters.push(price);
    }

    parameters.push(id);
    qs.stringify(obj).replace(/&/gim, ',');
    const result = await this.productRepository.query(query.replace('FIELDS', updateQuery), [...parameters, id]);
    return { message: PublicMessages.Updated, result };
  }
  async remove(id: number) {
    await this.findById(id);
    await this.productRepository.delete({ id });
    return { message: PublicMessages.Deleted };
  }
}
