import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccessTokenGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { BookModule } from './books/books.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, BookModule, BookmarksModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
