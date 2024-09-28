import { ValidateIncidentPipe } from './validate-incident.pipe';
import { BadRequestException } from '@nestjs/common';
import {
  IncidentType,
  IncidentPriority,
  IncidentMagnitude,
  IncidentEstatus,
  Department,
} from '../enums';

describe('ValidateIncidentPipe', () => {
  let validateIncidentPipe: ValidateIncidentPipe;

  beforeEach(() => {
    validateIncidentPipe = new ValidateIncidentPipe();
  });

  it('should be defined', () => {
    expect(validateIncidentPipe).toBeDefined();
  });

  it('should validate a correct incident', () => {
    const validIncident = {
      tipoIncendio: IncidentType.FORESTAL,
      prioridad: IncidentPriority.MEDIUM,
      magnitud: IncidentMagnitude.CONATO,
      estatus: IncidentEstatus.ACUDIENDO,
      depBomberos: Department.MARINO,
      latitud: 10,
      longitud: -70,
    };

    expect(validateIncidentPipe.transform(validIncident)).toEqual(validIncident);
  });

  it('should throw an error if incident type is invalid', () => {
    const invalidIncident = {
      tipoIncendio: 'InvalidType',
      prioridad: IncidentPriority.MEDIUM,
      magnitud: IncidentMagnitude.CONATO,
      estatus: IncidentEstatus.ACUDIENDO,
      depBomberos: Department.MARINO,
      latitud: 10,
      longitud: -70,
    };

    expect(() => validateIncidentPipe.transform(invalidIncident)).toThrow(
      BadRequestException,
    );
  });

  it('should throw an error if priority is invalid', () => {
    const invalidIncident = {
      tipoIncendio: IncidentType.FORESTAL,
      prioridad: 'InvalidPriority',
      magnitud: IncidentMagnitude.CONATO,
      estatus: IncidentEstatus.ACUDIENDO,
      depBomberos: Department.MARINO,
      latitud: 10,
      longitud: -70,
    };

    expect(() => validateIncidentPipe.transform(invalidIncident)).toThrow(
      BadRequestException,
    );
  });

  it('should throw an error if magnitude is invalid', () => {
    const invalidIncident = {
      tipoIncendio: IncidentType.FORESTAL,
      prioridad: IncidentPriority.MEDIUM,
      magnitud: 'InvalidMagnitude',
      estatus: IncidentEstatus.ACUDIENDO,
      depBomberos: Department.MARINO,
      latitud: 10,
      longitud: -70,
    };

    expect(() => validateIncidentPipe.transform(invalidIncident)).toThrow(
      BadRequestException,
    );
  });

  it('should throw an error if status is invalid', () => {
    const invalidIncident = {
      tipoIncendio: IncidentType.FORESTAL,
      prioridad: IncidentPriority.MEDIUM,
      magnitud: IncidentMagnitude.CONATO,
      estatus: 'InvalidStatus',
      depBomberos: Department.MARINO,
      latitud: 10,
      longitud: -70,
    };

    expect(() => validateIncidentPipe.transform(invalidIncident)).toThrow(
      BadRequestException,
    );
  });

  it('should throw an error if department is invalid', () => {
    const invalidIncident = {
      tipoIncendio: IncidentType.FORESTAL,
      prioridad: IncidentPriority.MEDIUM,
      magnitud: IncidentMagnitude.CONATO,
      estatus: IncidentEstatus.ACUDIENDO,
      depBomberos: 'InvalidDepartment',
      latitud: 10,
      longitud: -70,
    };

    expect(() => validateIncidentPipe.transform(invalidIncident)).toThrow(
      BadRequestException,
    );
  });

  it('should throw an error if latitude is invalid', () => {
    const invalidIncident = {
      tipoIncendio: IncidentType.FORESTAL,
      prioridad: IncidentPriority.MEDIUM,
      magnitud: IncidentMagnitude.CONATO,
      estatus: IncidentEstatus.ACUDIENDO,
      depBomberos: Department.MARINO,
      latitud: 100, // Invalid latitude
      longitud: -70,
    };

    expect(() => validateIncidentPipe.transform(invalidIncident)).toThrow(
      BadRequestException,
    );
  });

  it('should throw an error if longitude is invalid', () => {
    const invalidIncident = {
      tipoIncendio: IncidentType.FORESTAL,
      prioridad: IncidentPriority.MEDIUM,
      magnitud: IncidentMagnitude.CONATO,
      estatus: IncidentEstatus.ACUDIENDO,
      depBomberos: Department.MARINO,
      latitud: 10,
      longitud: -200, // Invalid longitude
    };

    expect(() => validateIncidentPipe.transform(invalidIncident)).toThrow(
      BadRequestException,
    );
  });
});
