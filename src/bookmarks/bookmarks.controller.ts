import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Bookmark } from '@prisma/client';
import { CurrentUserId } from 'src/common/decorators';
import { BookmarksService } from './bookmarks.service';
import { BookmarkEntity } from './entitites/bookmark.entity';

@ApiTags('Bookmarks')
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Get()
  @ApiBearerAuth()
  async findAll(@CurrentUserId() id: number): Promise<Bookmark[]> {
    const bookmarks = await this.bookmarksService.findAll(id);
    return bookmarks.map((bookmark) => new BookmarkEntity(bookmark));
  }

  @Post(':bookId')
  @ApiBearerAuth()
  create(
    @CurrentUserId() id: number,
    @Param('bookId') bookId: string,
  ): Promise<Bookmark> {
    return this.bookmarksService.create(id, +bookId);
  }

  @Delete(':bookmarkId')
  @ApiBearerAuth()
  remove(@Param('bookmarkId') bookmarkId: string): Promise<void> {
    return this.bookmarksService.remove(+bookmarkId);
  }
}
