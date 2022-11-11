import { Injectable } from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {
  signIn(signInAuthDto: SignInAuthDto) {
    return 'This action adds a new auth';
  }
  signUp(signUpAuthDto: SignUpAuthDto) {
    return '';
  }
}
