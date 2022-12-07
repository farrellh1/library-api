import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    return await this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAll(queryBookDto: QueryBookDto) {
    let { page, search } = queryBookDto;
    let query: object;

    if (!page) page = 1;

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
    return await this.prisma.book.findMany({
      skip: 15 * (page - 1),
      take: 15,
      where: query,
    });
  }

  async findOne(id: number) {
    return await this.prisma.book.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.prisma.book.update({
      where: {
        id,
      },
      data: updateBookDto,
    });
  }

  async remove(id: number) {
    await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
