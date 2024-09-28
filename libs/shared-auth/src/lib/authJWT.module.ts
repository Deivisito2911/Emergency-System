import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './const/secret';
import { AuthDataService } from './authData.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 15 * 60 + 's' },
    }),
  ],
  providers: [AuthDataService],
  exports: [JwtModule, AuthDataService],
})
export class AuthJWTModule {}
