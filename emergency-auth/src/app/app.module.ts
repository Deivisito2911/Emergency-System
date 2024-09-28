import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './shared/clients/DBUserClient/config';
import { DBConfig } from './shared/clients/DBUserClient/DbConfig';
import { DB_USER_NAME } from './shared/constans/DB_USER_NAME';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      name: DB_USER_NAME,
      useClass: DBConfig,
      imports: [ConfigModule],
    }),
    AuthModule,
  ],
})
export class AppModule {}
