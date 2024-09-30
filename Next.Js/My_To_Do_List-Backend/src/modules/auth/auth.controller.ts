/* eslint-disable prettier/prettier */
import { LoginDto } from './dto/login.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }
}
