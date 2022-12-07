import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { CurrentUserId } from 'src/common/decorators';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(@Query('page') page: number) {
    const users = await this.userService.findAll(page);
    return users.map((user) => new UserEntity(user));
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@CurrentUserId() id: number) {
    return new UserEntity(await this.userService.findOne(id));
  }

  @Patch('profile')
  @ApiBearerAuth()
  async update(
    @CurrentUserId() id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(await this.userService.update(id, updateUserDto));
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
