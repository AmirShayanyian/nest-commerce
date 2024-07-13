import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { PublicMessages } from 'src/common/enums/messages.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, description, slug } = createCategoryDto;
    const category = await this.categoryRepository.create({
      name,
      description,
      slug,
    });
    await this.categoryRepository.save(category);
    return { category, message: PublicMessages.Created };
  }
}
