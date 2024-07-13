import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumer } from 'src/common/enums/swagger-consumer.enum';

@ApiTags('Category')
@Controller(ControllerName.Category)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/')
  @ApiConsumes(SwaggerConsumer.Json, SwaggerConsumer.UrlEncoded)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('/')
  find() {
    return this.categoryService.find();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOneById(id);
  }
}
