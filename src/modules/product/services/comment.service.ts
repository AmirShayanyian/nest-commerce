import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dtos/comment/create-comment.dto';
import { PublicMessages } from 'src/common/enums/messages.enum';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>) {}

  async create(createCommentDto: CreateCommentDto, authorId: number) {
    const { text, reviewId } = createCommentDto;
    const comment = this.commentRepository.create({ text, reviewId, authorId });
    await this.commentRepository.save(comment);
    return { message: PublicMessages.Created };
  }
}
