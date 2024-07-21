import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dtos/comment/create-comment.dto';
import { PublicMessages } from 'src/common/enums/messages.enum';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const { text, reviewId, parentId } = createCommentDto;
    const comment = this.commentRepository.create({ text, reviewId, userId, parentId });
    await this.commentRepository.save(comment);
    return { message: PublicMessages.Created };
  }
}
