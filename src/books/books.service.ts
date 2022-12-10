import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    return await this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAll(userId: number, queryBookDto: QueryBookDto): Promise<Book[]> {
    let { page = 1, search } = queryBookDto;
    let query: Prisma.BookWhereInput;

    if (search) {
      query = {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            category: {
              contains: search,
            },
          },
        ],
      };
    }
    const books = await this.prisma.book.findMany({
      skip: 15 * (page - 1),
      take: 15,
      where: query,
      include: {
        users: {
          where: {
            userId,
          },
        },
      },
    });

    return books.map((book) => {
      const bookmarked = book.users.length > 0;
      delete book.users;
      return new BookEntity(book, bookmarked);
    });
  }

  async findOne(userId: number, id: number): Promise<Book> {

    const book = await this.prisma.book.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        users: {
          where: {
            userId,
          },
        },
      },
    });
    const bookmarked = book.users.length > 0
    return new BookEntity(book, bookmarked)
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    return await this.prisma.book.update({
      where: {
        id,
      },
      data: updateBookDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
