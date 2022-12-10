import { Bookmark } from '@prisma/client';
import { Transform } from 'class-transformer';
import { BookEntity } from 'src/books/entities/book.entity';

export class BookmarkEntity implements Bookmark {
  id: number;
  userId: number;
  bookId: number;
  createdAt: Date;
  updatedAt: Date;

  @Transform(({ value }) => new BookEntity(value, true))
  book: BookEntity;

  constructor(partial: Partial<BookmarkEntity>) {
    Object.assign(this, partial);
  }
}
