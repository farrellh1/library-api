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

  constructor(partial: Partial<BookEntity>) {
    Object.assign(this, partial);
  }
}


