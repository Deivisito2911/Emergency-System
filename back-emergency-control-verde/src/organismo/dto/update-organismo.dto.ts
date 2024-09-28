import { PartialType } from '@nestjs/swagger';
import { CreateOrganismoDto } from './create-organismo.dto';

export class UpdateOrganismoDto extends PartialType(CreateOrganismoDto) {}
