import { ConflictException, Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number): Promise<Bookmark[]> {
    return await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        book: true,
      },
    });
  }

  async create(userId: number, bookId: number): Promise<Bookmark> {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        userId,
        bookId,
      },
    });

    if (bookmark)
      throw new ConflictException("You've already bookmarks this book");

    return await this.prisma.bookmark.create({
      data: {
        userId,
        bookId,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.bookmark.delete({
      where: {
        id,
      },
    });
  }
}
