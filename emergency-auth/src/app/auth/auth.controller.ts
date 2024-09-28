import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from '@emgencias-udo/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('isLogin')
  getProfile(@Headers('Authorization') authJwt: string) {
    const decoded = this.authService.getAuthData(
      authJwt.replace('Bearer ', '')
    );
    return decoded;
  }
}
