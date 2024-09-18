import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dtos/comment/create-comment.dto';
import { PublicMessages } from 'src/common/enums/messages.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { EntityName } from 'src/common/enums/entity.enum';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const { text, reviewId, parentId } = createCommentDto;
    const comment = this.commentRepository.create({ text, reviewId, userId, parentId });
    await this.commentRepository.save(comment);
    return { message: PublicMessages.Created };
  }

  async find(paginationDto: PaginationDto) {
    const { limit, page, skip } = paginationSolver(paginationDto);
    const [comments, count] = await this.commentRepository.findAndCount({
      relations: {
        children: {
          children: {
            children: {
              children: true,
            },
          },
        },
        user: true,
      },
      select: {
        text: true,
        children: true,
        approved: true,
        user: {
          first_name: true,
          last_name: true,
          email: true,
        },
      },
      order: {
        created_at: 'DESC',
      },
    });

    return {
      pagination: paginationGenerator(count, page, limit),
      comments,
    };
  }
}
