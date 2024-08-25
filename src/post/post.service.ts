import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: number, dto: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async updatePost(
    postId: number,
    userId: number,
    dto: UpdatePostDto,
  ): Promise<Post> {
    return this.prisma.post.update({
      where: {
        id: postId,
        userId,
      },
      data: dto,
    });
  }

  async deletePost(postId: number, userId: number): Promise<void> {
    await this.prisma.post.deleteMany({
      where: {
        id: postId,
        userId,
      },
    });
  }

  async getPostById(postId: number): Promise<Post> {
    return this.prisma.post.findUnique({
      where: { id: postId },
    });
  }

  async getAllPosts(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async getPostsByTag(tag: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        tags: {
          has: tag,
        },
      },
    });
  }

  async searchPosts(keyword: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: keyword } },
          { content: { contains: keyword } },
        ],
      },
    });
  }
}
