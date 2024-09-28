import { Module } from '@nestjs/common';
import { FireIncidentsModule } from '../incidents/fire-incidents.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, AuthJWTModule } from '@emgencias-udo/auth';

@Module({
  imports: [
    FirebaseModule,
    FireIncidentsModule,
    AuthJWTModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  
})
export class AppModule {}
