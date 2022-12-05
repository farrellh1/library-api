import { Controller, Get, Post, Body, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, CurrentUserId, Public } from 'src/common/decorators';
import { refreshTokenGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { TokenEntity } from './entities/token.entity';
import { Tokens } from './types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiCreatedResponse({ type: TokenEntity })
  @Post('login')
  signIn(@Body() signInAuthDto: SignInAuthDto): Promise<Tokens> {
    return this.authService.signIn(signInAuthDto);
  }

  @Public()
  @ApiCreatedResponse({ type: TokenEntity })
  @Post('register')
  signUp(@Body() signUpAuthDto: SignUpAuthDto): Promise<Tokens> {
    return this.authService.signUp(signUpAuthDto);
  }

  @Public()
  @UseGuards(refreshTokenGuard)
  @ApiOkResponse({ type: TokenEntity })
  @Get('refresh')
  @ApiHeader({ name: 'Authorization', description: 'Pass the refresh token' })
  refresh(
    @CurrentUser('email') email: string,
    @CurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refresh(email, refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('logout')
  @ApiHeader({ name: 'Authorization', description: 'Pass the access token' })
  logout(@CurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }
}
