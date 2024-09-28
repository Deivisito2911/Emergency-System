import { Module } from '@nestjs/common';
import { DenuncianteService } from './denunciante.service';
import { DenuncianteController } from './denunciante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Denunciante } from './denunciante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Denunciante])],
  controllers: [DenuncianteController],
  providers: [DenuncianteService],
  exports: [DenuncianteService],
})
export class DenuncianteModule {}
