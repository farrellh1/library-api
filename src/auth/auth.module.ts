import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaClient],
})
export class AuthModule {}
