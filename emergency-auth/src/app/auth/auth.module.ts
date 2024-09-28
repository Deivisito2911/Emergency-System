import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthJWTModule, jwtConstants } from '@emgencias-udo/auth';

@Module({
  imports: [
    UserModule,
    AuthJWTModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
