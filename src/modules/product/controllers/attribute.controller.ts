import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ControllerName } from 'src/common/enums/controller.enum';
import { SwaggerConsumer } from 'src/common/enums/swagger-consumer.enum';
import { AttributeService } from '../services/attribute.service';
import { CreateAttributeDto } from '../dtos/attributes/create-attribute.dto';

@Controller(ControllerName.ProductAttribute)
@ApiTags('Product_Attributes')
export class ProductAttributeController {
  constructor(private attributeService: AttributeService) {}

  @Post('/')
  @ApiConsumes(SwaggerConsumer.Json)
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributeService.create(createAttributeDto);
  }

  @Get('/')
  findAll() {
    return this.attributeService.findAll();
  }

  @Get('/by-product-id/:productId')
  findByProductId(@Param('productId') productId: number) {
    return this.attributeService.findByProductId(productId);
  }

  @Post('/add-attribute/:productId')
  addAttByproductId(@Param('productId') productId: number, @Body() updateAttributeDto: CreateAttributeDto) {
    return this.attributeService.addAttByProductId(productId, updateAttributeDto);
  }
}
