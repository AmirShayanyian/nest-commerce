import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumer } from 'src/common/enums/swagger-consumer.enum';
import { UpdateCategoryDto } from './dtos/update-category.dto';

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

  @Patch('/:id')
  updateOne(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.updateOne(updateCategoryDto, id);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id)
  }
}
