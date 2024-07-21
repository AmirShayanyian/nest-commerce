import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dtos/comment/create-comment.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuards } from 'src/modules/auth/guards/auth.guard';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';

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

  @Get('/')
  @SkipAuth()
  @Pagination()
  find(@Query() paginationDto:PaginationDto){
    return this.commentService.find(paginationDto);
  }
}
