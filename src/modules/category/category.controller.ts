import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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

  @Get('/by-id/:id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOneById(id);
  }

  @Get('/by-slug/:slug')
  @ApiParam({ name: 'slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.categoryService.findOneBySlug(slug);
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
    return this.categoryService.remove(id);
  }
}
