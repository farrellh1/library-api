import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Book } from '@prisma/client';
import { CurrentUserId } from 'src/common/decorators';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@ApiTags('Book')
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: BookEntity })
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return new BookEntity(await this.bookService.create(createBookDto), false);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: BookEntity, isArray: true })
  async findAll(
    @CurrentUserId() userId: number,
    @Query() query: QueryBookDto,
  ): Promise<Book[]> {
    return await this.bookService.findAll(userId, query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: BookEntity })
  async findOne(
    @CurrentUserId() userId: number,
    @Param('id') id: string,
  ): Promise<Book> {
    return await this.bookService.findOne(userId, +id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: BookEntity })
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.bookService.remove(+id);
  }
}
