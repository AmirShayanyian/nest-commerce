import { Controller } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { ReviewService } from '../services/review.service';
import { ApiTags } from '@nestjs/swagger';

@Controller(ControllerName.ProductReview)
@ApiTags('Product_Reviews')
export class ProductReviewController {
  constructor(private reviewService: ReviewService) {}
}
