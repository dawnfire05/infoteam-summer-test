import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  UseGuards,
  Patch,
  Delete,
  Req,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() dto: CreatePostDto, @Req() req) {
    return this.postService.createPost(req.user.id, dto);
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('search')
  searchPosts(@Query('keyword') keyword: string) {
    return this.postService.searchPosts(keyword);
  }

  @Get('tag/:tag')
  getPostsByTag(@Param('tag') tag: string) {
    return this.postService.getPostsByTag(tag);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePost(@Param('id') id: number, @Body() dto: UpdatePostDto, @Req() req) {
    return this.postService.updatePost(Number(id), req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: number, @Req() req) {
    return this.postService.deletePost(Number(id), req.user.id);
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postService.getPostById(Number(id));
  }
}
