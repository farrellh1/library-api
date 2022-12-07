import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignInAuthDto, SignUpAuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signIn(signInAuthDto: SignInAuthDto): Promise<Tokens> {
    const { email, password } = signInAuthDto;

    const user = await this.findUser(email);
    await this.checkPassword(user, password);

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async signUp(signUpAuthDto: SignUpAuthDto): Promise<Tokens> {
    const { email, password, name, whatsapp } = signUpAuthDto;

    //check user
    await this.findUser(email);

    //hash the password
    const hashedPassword = await this.hashData(password);

    //create user
    const user = await this.userService.create({
      email,
      password: hashedPassword,
      name: name,
      whatsapp: whatsapp,
    });
    const tokens = await this.generateTokens(user);

    //update refresh token
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    //return tokens
    return tokens;
  }

  async refresh(email: string, refreshToken: string) {
    const user = await this.findUser(email);
    await this.checkRefreshToken(refreshToken, user);

    const tokens = await this.generateTokens(user);

    //update refresh token
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    //return tokens
    return tokens;
  }

  async logout(userId: number) {
    const user = await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });

    if (user.count == 0) throw new ForbiddenException();
  }

  async hashData(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async generateTokens(user: User): Promise<Tokens> {
    return {
      access_token: await this.generateAccessToken(user),
      refresh_token: await this.generateRefreshToken(user),
    };
  }

  async generateAccessToken(user: User): Promise<string> {
    const jwtPayload = this.jwtPayload(user);

    return await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const jwtPayload = this.jwtPayload(user);

    return await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  // actually if we use TypeORM we can just do user.save() without querying again
  async updateRefreshToken(
    userId: number,
    refresh_token: string,
  ): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: await this.hashData(refresh_token),
      },
    });
  }

  async findUser(email: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async checkPassword(user: User, password: string): Promise<User> {
    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) return user;

    throw new UnauthorizedException("Email or password does't not match");
  }

  async checkRefreshToken(refresh_token: string, user: User): Promise<void> {
    const matchRefreshToken = await bcrypt.compare(
      refresh_token,
      user.refreshToken,
    );

    if (matchRefreshToken) return;

    throw new UnauthorizedException('Unauthorized');
  }

  jwtPayload(user: User): JwtPayload {
    return {
      sub: user.id,
      email: user.email,
    };
  }
}
