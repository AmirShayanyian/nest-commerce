import { Body, Controller, Post } from '@nestjs/common';
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
}
