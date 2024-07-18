import { InjectRepository } from '@nestjs/typeorm';
import { ProductReviewEntity } from '../entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from '../dtos/review/create-review.dto';
import { PublicMessages } from 'src/common/enums/messages.enum';
import { ProductService } from './product.service';
import { CreateVoteDto } from '../dtos/review/create-vote.dto';

export class ReviewService {
  constructor(
    @InjectRepository(ProductReviewEntity) private reviewRepository: Repository<ProductReviewEntity>,
    private productService: ProductService
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: number) {
    const { text, rating, productId } = createReviewDto;
    await this.productService.findById(productId);
    // const review = this.reviewRepository.create({ text, rating, productId, authorId: userId });
    const review = await this.reviewRepository.query(
      'INSERT INTO product_review (text,rating,productId,authorId) VALUES (?,?,?,?)',
      [text, rating, productId, userId]
    );
    await this.reviewRepository.save(review);
    return { message: PublicMessages.Created };
  }

  async createVote(createVoteDto: CreateVoteDto) {
    const { reviewId, like } = createVoteDto;
    const review = await this.reviewRepository.findOneBy({ id: reviewId });
    if (like) review.upVote++;
    else review.downVote++;
    await this.reviewRepository.save(review);
    return {
      message: PublicMessages.Created,
    };
  }
}
