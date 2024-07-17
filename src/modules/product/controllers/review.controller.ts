import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { ReviewService } from '../services/review.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateReviewDto } from '../dtos/review/create-review.dto';
import { SwaggerConsumer } from 'src/common/enums/swagger-consumer.enum';
import { AuthGuards } from 'src/modules/auth/guards/auth.guard';

@Controller(ControllerName.ProductReview)
@ApiTags('Product_Reviews')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuards)
export class ProductReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('/')
  @ApiConsumes(SwaggerConsumer.Json, SwaggerConsumer.UrlEncoded)
  create(@Req() req: Request, @Body() createReviewDto: CreateReviewDto) {
    const { id } = req.user;
    return this.reviewService.create(createReviewDto, +id);
  }
}
