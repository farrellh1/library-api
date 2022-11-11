import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { SignInAuthDto } from './signin-auth.dto';

export class SignUpAuthDto extends PartialType(SignInAuthDto) {
  @IsString()
  name: string

  @IsString()
  whatsapp: string

  @IsString()
  passwordConfirmation: string
}
