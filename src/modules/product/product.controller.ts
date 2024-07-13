import { Controller } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@Controller(ControllerName.Product)
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}
}
