import { Book, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

export class BookEntity implements Book {
  id: number;
  title: string;
  author: string;
  category: string;

  @Transform(({ value }) => parseFloat(value))
  rating: Prisma.Decimal;

  synopsys: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;

  is_bookmarked: boolean;

  constructor(partial: Partial<BookEntity>, is_bookmarked: boolean) {
    Object.assign(this, partial);
    this.is_bookmarked = is_bookmarked;
  }
}
