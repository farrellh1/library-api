import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInAuthDto {
  @ApiProperty({ example: 'john@email.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string
}
