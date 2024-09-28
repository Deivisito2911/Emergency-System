import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import {
  IncidentType,
  IncidentPriority,
  IncidentMagnitude,
  IncidentEstatus,
  Department,
} from '../enums';

@Injectable()
export class ValidateIncidentPipe implements PipeTransform {
  transform(value: any) {
    this.validateFieldValue(
      value.tipoIncendio,
      Object.values(IncidentType),
      'Tipo de Incendio'
    );
    this.validateFieldValue(
      value.prioridad,
      Object.values(IncidentPriority),
      'Prioridad del incendio'
    );
    this.validateFieldValue(
      value.magnitud,
      Object.values(IncidentMagnitude),
      'Magnitud del incendio'
    );
    this.validateFieldValue(
      value.estatus,
      Object.values(IncidentEstatus),
      'Estatus del incendio'
    );
    this.validateFieldValue(
      value.depBomberos,
      Object.values(Department),
      'Departamento de Bomberos'
    );

    if (
      typeof value.latitud !== 'number' ||
      value.latitud < -90 ||
      value.latitud > 90
    ) {
      throw new BadRequestException(
        'Latitud inválida o faltante. Debe ser un número entre -90 y 90.'
      );
    }

    if (
      typeof value.longitud !== 'number' ||
      value.longitud < -180 ||
      value.longitud > 180
    ) {
      throw new BadRequestException(
        'Longitud inválida o faltante. Debe ser un número entre -180 y 180.'
      );
    }

    return value;
  }

  private validateFieldValue(
    value: any,
    validValues: any[],
    fieldName: string
  ) {
    if (!validValues.includes(value)) {
      throw new BadRequestException(`${fieldName} inválido.`);
    }
  }
}
