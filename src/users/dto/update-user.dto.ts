import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: '0812345678' })
  @IsString()
  whatsapp: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;
}
