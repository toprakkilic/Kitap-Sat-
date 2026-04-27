// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body.username, body.password);
  }

  @Post('register')
  async register(@Body() registerData: any) {
    // registerData içinde { username, password } geldiğini varsayıyoruz
    return this.authService.register(registerData);
}
}