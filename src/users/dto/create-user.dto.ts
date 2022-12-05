import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  whatsapp: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
