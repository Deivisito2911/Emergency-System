import { Module } from '@nestjs/common';
import { AfectadoService } from './afectado.service';
import { AfectadoController } from './afectado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Afectado } from './afectado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Afectado])],
  controllers: [AfectadoController],
  providers: [AfectadoService],
  exports: [AfectadoService],
})
export class AfectadoModule {}
