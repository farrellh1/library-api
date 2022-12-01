import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, CurrentUserId, Public } from 'src/common/decorators';
import { refreshTokenGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInAuthDto: SignInAuthDto): Promise<Tokens> {
    return this.authService.signIn(signInAuthDto);
  }

  @Public()
  @Post('register')
  signUp(@Body() signUpAuthDto: SignUpAuthDto): Promise<Tokens> {
    return this.authService.signUp(signUpAuthDto);
  }

  @Public()
  @UseGuards(refreshTokenGuard)
  @Get('refresh')
  refresh(
    @CurrentUser('email') email: string,
    @CurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refresh(email, refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('logout')
  logout(@CurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }
}
