import { Module } from '@nestjs/common';
import { OperadorService } from './operador.service';
import { OperadorController } from './operador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operador } from './operador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Operador])],
  providers: [OperadorService],
  controllers: [OperadorController],
  exports: [OperadorService],
})
export class OperadorModule {}
