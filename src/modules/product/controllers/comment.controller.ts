import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dtos/comment/create-comment.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuards } from 'src/modules/auth/guards/auth.guard';

@Controller(ControllerName.Comment)
@ApiTags('Comment')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuards)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/')
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: Request) {
    const { id } = req.user;
    return this.commentService.create(createCommentDto, +id);
  }
}
