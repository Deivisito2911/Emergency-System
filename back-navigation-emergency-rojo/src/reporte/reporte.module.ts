import { Module } from '@nestjs/common';
import { ReporteController } from './reporte.controller';
import { ReporteService } from './reporte.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reporte } from './reporte.entity';
import { EmbarcacionModule } from '../embarcacion/embarcacion.module';
import { AlertaModule } from '../alerta/alerta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reporte]),
    EmbarcacionModule,
    AlertaModule,
  ],
  controllers: [ReporteController],
  providers: [ReporteService],
})
export class ReporteModule {}
