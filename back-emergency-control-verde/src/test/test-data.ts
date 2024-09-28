import { Afectado } from '../afectado/afectado.entity';
import { Incidencia } from '../incidencia/incidencia.entity';
import { Operador } from '../operador/operador.entity';
import { Organismo } from '../organismo/organismo.entity';
import { Denunciante } from '../denunciante/denunciante.entity';
import { CreateAfectadoDto } from '../afectado/dto/create-afectado.dto';
import { CreateDenuncianteDto } from '../denunciante/dto/create-denunciante.dto';
import { CreateOperadorDto } from '../operador/dto/create-operador.dto';
import { CreateIncidenciaDto } from '../incidencia/dto/create-incidencia.dto';
import { CreateOrganismoDto } from '../organismo/dto/create-organismo.dto';

export const operador: Operador = {
  cedula: '12345678',
  nombre: 'OperadorNombre',
  apellido: 'OperadorApellido',
  fecha_de_nacimiento: new Date('1980-01-01'),
  sexo: 'M',
  telefono: '1234567890',
  correo: 'operador@example.com',
  fecha_de_contratacion: new Date('2020-01-01'),
  direccion: 'OperadorDireccion',
  telefono_fijo: '0987654321',
  incidencias: [],
};

export const organismo: Organismo = {
  codigo: 'org-1234',
  nombre: 'OrganismoNombre',
  correo: 'organismo@example.com',
  telefono: '1234567890',
};

export const afectado: Afectado = {
  id: 'uuid-1234',
  cedula: '12345678',
  nombre: 'John',
  apellido: 'Doe',
  fecha_de_nacimiento: new Date('1984-03-20'),
  sexo: 'M',
  estado: 'active',
  tipo_sangre: 'O+',
  afecciones: 'ajsdiadj',
  incidencia: {} as Incidencia,
};

export const incidencia: Incidencia = {
  codigo: 'uuid-5678',
  fecha: new Date(),
  tipo: 'Naufragio',
  lugar: 'lugar de incidencia',
  cantidad_afectados: 1,
  descripcion: 'Descripción de la incidencia',
  operador: operador,
  organismos: [organismo],
  afectados: [afectado],
  denunciante: {} as Denunciante,
};

export const denunciante: Denunciante = {
  id: 'denunciante-1234',
  cedula: '31443201',
  nombre: 'DenuncianteNombre',
  telefono: '0987654321',
  incidencia: {} as Incidencia,
};

export const createAfectadoDto: CreateAfectadoDto = {
  id: 'some-uuid',
  cedula: '12345678',
  nombre: 'John',
  fecha_de_nacimiento: new Date('1990-01-01'),
  apellido: 'Doe',
  sexo: 'M',
  afecciones: 'None',
  estado: 'xd',
  tipo_sangre: 'O+',
};

export const createDenuncianteDto: CreateDenuncianteDto = {
  id: 'denunciante-1234',
  cedula: '31443201',
  nombre: 'DenuncianteNombre',
  telefono: '0987654321',
};

export const createIncidenciaDto: CreateIncidenciaDto = {
  codigo: 'uuid-5678',
  tipo: 'tipo de incidencia',
  lugar: 'lugar de incidencia',
  cantidad_afectados: 1,
  descripcion: 'Descripción de la incidencia',
  afectados: [afectado],
  denunciante: {} as Denunciante,
};

export const createOperadorDto: CreateOperadorDto = {
  cedula: '12345678',
  nombre: 'OperadorNombre',
  apellido: 'OperadorApellido',
  fecha_de_nacimiento: new Date('1980-01-01'),
  sexo: 'M',
  telefono: '1234567890',
  correo: 'operador@example.com',
  fecha_de_contratacion: new Date('2020-01-01'),
  direccion: 'OperadorDireccion',
  telefono_fijo: '0987654321',
};

export const createOrganismoDto: CreateOrganismoDto = {
  codigo: 'org-1234',
  nombre: 'OrganismoNombre',
  correo: 'organismo@example.com',
  telefono: '1234567890',
};

afectado.incidencia = incidencia;
incidencia.afectados.push(afectado);
incidencia.denunciante = denunciante;
denunciante.incidencia = incidencia;

export function removeCircularReferences(obj: any, seen = new WeakSet()): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (seen.has(obj)) {
    return '[Circular]';
  }

  seen.add(obj);

  if (Array.isArray(obj)) {
    return obj.map((item) => removeCircularReferences(item, seen));
  }

  const newObj: any = {};
  for (const key in obj) {
    /*eslint no-prototype-builtins: 1*/
    if (obj.hasOwnProperty(key)) {
      newObj[key] = removeCircularReferences(obj[key], seen);
    }
  }

  return newObj;
}

export function mapCreateAfectadoDtoToAfectado(
  dto: CreateAfectadoDto,
  incidencia: Incidencia
): Afectado {
  return {
    ...dto,
    incidencia: incidencia,
  };
}
