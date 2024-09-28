import { PartialType } from '@nestjs/swagger';
import { CreateAfectadoDto } from './create-afectado.dto';

export class UpdateAfectadoDto extends PartialType(CreateAfectadoDto) {}
