import { Module } from '@nestjs/common';
import { IncidenciaService } from './incidencia.service';
import { IncidenciaController } from './incidencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidencia } from './incidencia.entity';
import { OperadorModule } from '../operador/operador.module';
import { AfectadoModule } from '../afectado/afectado.module';
import { DenuncianteModule } from '../denunciante/denunciante.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidencia]),
    OperadorModule,
    AfectadoModule,
    DenuncianteModule,
    EmailModule,
  ],
  controllers: [IncidenciaController],
  providers: [IncidenciaService],
})
export class IncidenciaModule {}
