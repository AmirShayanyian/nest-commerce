import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { ProductService } from '../services/product.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dtos/create-product.dto';
import { SwaggerConsumer } from 'src/common/enums/swagger-consumer.enum';
import { UpdateProductDto } from '../dtos/update-product.dto';

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
  find() {
    return this.productService.find();
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
