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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@ApiTags('Book')
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return new BookEntity(await this.bookService.create(createBookDto));
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: BookEntity, isArray: true })
  findAll(@Query('page') page: number) {
    return this.bookService.findAll(page);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: BookEntity })
  async findOne(@Param('id') id: string) {
    return new BookEntity(await this.bookService.findOne(+id));
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: BookEntity })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
