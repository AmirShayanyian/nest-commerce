import { Controller } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { CategoryService } from './category.service';

@Controller(ControllerName.Category)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  
}
