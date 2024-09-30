/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if(user) {
      if (await bcrypt.compare(loginDto.password, user.password)) {
        const payload = { email: user.email, sub: user.id };
        return{
          accessToken: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException('Email e/ou senha inválidos.');
      }
    }
    throw new UnauthorizedException('Email e/ou senhas inválidos.');
  }
}
