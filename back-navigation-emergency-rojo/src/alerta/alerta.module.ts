import { Module } from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alerta } from './alerta.entity';
import { Embarcacion } from '../embarcacion/embarcacion.entity';
import { AlertaController } from './alerta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alerta, Embarcacion])],
  providers: [AlertaService],
  controllers: [AlertaController],
  exports: [AlertaService],
})
export class AlertaModule {}
