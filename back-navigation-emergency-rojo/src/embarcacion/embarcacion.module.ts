import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Embarcacion } from './embarcacion.entity';
import { EmbarcacionController } from './embarcacion.controller';
import { EmbarcacionService } from './embarcacion.service';
import { AlertaModule } from '../alerta/alerta.module';

@Module({
  imports: [TypeOrmModule.forFeature([Embarcacion]), AlertaModule],
  controllers: [EmbarcacionController],
  providers: [EmbarcacionService],
  exports: [EmbarcacionService],
})
export class EmbarcacionModule {}
