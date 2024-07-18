import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { ProductService } from '../services/product.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { SwaggerConsumer } from 'src/common/enums/swagger-consumer.enum';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller(ControllerName.Product)
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/')
  @ApiConsumes(SwaggerConsumer.Json, SwaggerConsumer.UrlEncoded)
  create(@Body() productDto: CreateProductDto) {
    return this.productService.create(productDto);
  }

  @Get('/')
  @Pagination()
  find(@Query() paginationDto: PaginationDto) {
    return this.productService.find(paginationDto);
  }

  @Get('by-id/:id')
  findById(@Param('id') id: number) {
    return this.productService.findById(id);
  }

  // @Get('by-slug/:sku')

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
