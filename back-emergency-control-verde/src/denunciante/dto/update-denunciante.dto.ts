import { PartialType } from '@nestjs/swagger';
import { CreateDenuncianteDto } from './create-denunciante.dto';

export class UpdateDenuncianteDto extends PartialType(CreateDenuncianteDto) {}
