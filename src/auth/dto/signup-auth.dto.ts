import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorators';
import { SignInAuthDto } from './signin-auth.dto';

export class SignUpAuthDto extends PartialType(SignInAuthDto){
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '0812345678' })
  @IsString()
  @IsNotEmpty()
  whatsapp: string;

  @ApiProperty({ example: 'password'})
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Match(SignUpAuthDto, (s) => s.password)
  password_confirmation: string;
}
