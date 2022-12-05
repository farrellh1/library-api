import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignInAuthDto {
  @ApiProperty({ example: 'john@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: 'password' })
  @MinLength(6)
  @IsNotEmpty()
  password: string
}
