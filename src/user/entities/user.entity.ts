import { ApiHideProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  email: string;
  whatsapp: string;
  name: string;

  @ApiHideProperty()
  @Exclude()
  password: string;

  @ApiHideProperty()
  @Exclude()
  refreshToken: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
