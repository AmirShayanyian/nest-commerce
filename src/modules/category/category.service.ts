import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { NotFoundMessages, PublicMessages } from 'src/common/enums/messages.enum';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private dataSource: DataSource
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
  async find() {
    return await this.categoryRepository.find();
  }
  async findOneById(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (category) {
      return category;
    }
    throw new NotFoundException(NotFoundMessages.CategoryNotFound);
  }

  async updateOne(updateCategoryDto: UpdateCategoryDto, id: number) {
    await this.findOneById(id);
    const { description, name, slug } = updateCategoryDto;
    await this.categoryRepository.update({ id }, { description, name, slug });
    return { message: PublicMessages.Updated };
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const mmd = await queryRunner.query(`DELETE FROM category WHERE id = ?`, [id]);
    // await this.findOneById(id);
    // await this.categoryRepository.delete({ id });
    return { message: PublicMessages.Deleted, mmd };
  }

  async findOneBySlug(slug: string) {
    const category = await this.categoryRepository.find({
      where: { slug },
      order: {
        id: 'ASC',
      },
    });
    if (category) throw new NotFoundException(NotFoundMessages.CategoryNotFound);
    return category;
  }
}
