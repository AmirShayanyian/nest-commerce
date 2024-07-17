import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { ProductService } from '../services/product.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dtos/create-product.dto';
import { SwaggerConsumer } from 'src/common/enums/swagger-consumer.enum';

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
}
