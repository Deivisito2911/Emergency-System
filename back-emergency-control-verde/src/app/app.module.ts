import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from '../email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import EmailConfig from '../email/email.configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperadorModule } from '../operador/operador.module';
import databaseConfig from './database.config';
import { DenuncianteModule } from '../denunciante/denunciante.module';
import { AfectadoModule } from '../afectado/afectado.module';
import { OrganismoModule } from '../organismo/organismo.module';
import { IncidenciaModule } from '../incidencia/incidencia.module';
import { LogsModule } from '../logs/logs.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, AuthJWTModule } from '@emgencias-udo/auth';
@Module({
  imports: [
    EmailModule,
    OperadorModule,
    DenuncianteModule,
    AfectadoModule,
    OrganismoModule,
    IncidenciaModule,
    AuthJWTModule,
    LogsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EmailConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('dbConfig'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
